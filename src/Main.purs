module Main (main) where

import MasonPrelude

import Attribute (Attribute)
import Attribute as A
import Css (Styles)
import Css as C
import Css.Functions as CF
import Data.Array as Array
import Data.List ((:))
import Data.List as List
import Data.Map (Map)
import Data.Map as Map
import Data.Set as Set
import Data.String.Utils (startsWith)
import Data.String.CodePoints as String
import Debug as Debug
import Design as Ds
import Html (Html)
import Html as H
import InputBox (InputBox)
import InputBox as InputBox
import Platform (Cmd(..), Program, Update, afterRender, batch, tell)
import Platform as Platform
import Producer as P
import RefEq (RefEq(..))
import Sub (Sub)
import Sub as Sub
import TreeMap (IVP, Thread, TreeMap, toTreeMap)
import TreeMap as TreeMap
import WebSocketSub (wsToSub)
import WHATWG.HTML.All as HTML
import WHATWG.HTML.HTMLTextAreaElement as TextArea
import Y.Client.WebSocket (Client)
import Y.Client.WebSocket as Ws
import Y.Shared.Event (Event(..), EventPayload(..))
import Y.Shared.Id (Id)
import Y.Shared.Id as Id
import Y.Shared.Message (Message)
import Y.Shared.Transmission (ToClient(..), ToServer(..))
import Y.Shared.Util.Instant (Instant, asMilliseconds)
import Y.Shared.Util.Instant as Instant

foreign import initialize_f :: ∀ a b r.  (Id a -> Id b -> r) -> Id a -> Id b -> Effect r
foreign import getHostname :: Effect String
foreign import sendNotification :: String -> String -> Effect Unit
foreign import notificationsPermission :: Effect Unit
foreign import hasFocus :: Effect Boolean

main :: Program Unit Model Msg
main = do
  Platform.app
    { init
    , update
    , view
    , subscriptions
    }

type Model =
  { convoId :: Id "Convo"
  , userId :: Id "User"
  , wsClient :: Client ToServer ToClient
  , state :: State
  , inputBox :: InputBox
  , thread :: Maybe Leaf
  , messageParent :: Maybe (Id "Message")
  , nameInput :: String
  , unread :: Boolean
  }

type Leaf = (Id "Message")

type State =
  { events :: Array Event
  , names :: Map (Id "User") String
  , messages :: MessageTree
  }

type MessageTree = TreeMap (Id "Message") Message

init :: Unit -> Update Msg Model
init _ = do
  liftEffect notificationsPermission

  userId /\ convoId <- liftEffect do
    freshUserId /\ freshConvoId <- liftEffect $ lift2 Tuple Id.new Id.new
    initialize_f Tuple freshUserId freshConvoId

  wsClient <-
    liftEffect do
      hostname <- getHostname
      Ws.newConnection { url: "ws://" <> hostname <> ":8081" }
      -- Ws.newConnection { url: "ws://y.maynards.site:8081" }

  tell
    (Cmd
       \msgCallback -> do
         Ws.onOpen
           (msgCallback WebSocketOpened)
           wsClient
    )

  pure
    { convoId
    , userId
    , wsClient
    , state:
        { events: []
        , messages: TreeMap.empty
        , names: Map.empty
        }
    , inputBox: InputBox.default
    , thread: Nothing
    , messageParent: Nothing
    , nameInput: ""
    , unread: false
    }

data Msg
  = WebSocketOpened
  | TransmissionReceived (Maybe ToClient)
  | UpdateInputBox String Number
  | SendMessage
  | SelectThreadRoot (Id "Message")
  | NewThread
  | SelectMessageParent (Id "Message")
  | UpdateNameInput String
  | UpdateName
  | SelectSibling (Id "Message")
  | Focused

instance Eq Msg where
  eq =
    case _, _ of
      UpdateInputBox s1 h1, UpdateInputBox s2 h2 -> s1 == s2 && h1 == h2
      SendMessage, SendMessage -> true
      WebSocketOpened, WebSocketOpened -> true
      SelectThreadRoot m1, SelectThreadRoot m2 -> m1 == m2
      NewThread, NewThread -> true
      SelectMessageParent m1, SelectMessageParent m2 -> m1 == m2
      UpdateNameInput s1, UpdateNameInput s2 -> s1 == s2
      UpdateName, UpdateName -> true
      SelectSibling m1, SelectSibling m2 -> m1 == m2
      Focused, Focused -> true
      _, _ -> false

update :: Model -> Msg -> Update Msg Model
update model@{ userId, convoId } =
  let
    _ = Debug.log model

    focusInput =
      afterRender
      $ HTML.window
        >>= HTML.document
        >>= HTML.getElementById inputId .> map HTML.toMaybeHTMLElement
        >>= maybe (pure unit) (HTML.focus {})
  in
  case _ of
    Focused -> pure $ model { unread = false }

    SelectSibling mid -> do
      focusInput

      pure
        (model
           { messageParent = Just mid
           , thread = TreeMap.findLeaf mid model.state.messages
           }
        )

    UpdateName -> do
      liftEffect do
        pushEvent model
          \_ ->
            EventPayload_SetName
              { convoId
              , userId
              , name: model.nameInput
              }

      pure model

    UpdateNameInput str -> pure $ model { nameInput = str }

    SelectMessageParent mid -> do
      focusInput
      pure $ model { messageParent = Just mid }

    NewThread -> do
      focusInput

      pure
        (model
           { thread = Nothing
           , messageParent = Nothing
           }
        )

    SelectThreadRoot mid -> do
      focusInput

      pure
        (model
           { thread = Just mid
           , messageParent = Just mid
           }
        )

    SendMessage -> do
      focusInput

      let
        content = InputBox.content model.inputBox

        errorMsg =
          model
            { inputBox =
                InputBox.setContent
                  "You didn't send that message!"
                  model.inputBox
            }

      if content == "" then
        pure model
      else if content == "/delete" then
        (do
           mid <- model.messageParent
           { value: mes } <- TreeMap.lookup mid model.state.messages

           Just
             (if mes.authorId == userId then do
                liftEffect
                  (pushEvent model
                     \_ ->
                       EventPayload_MessageDelete
                         { convoId
                         , userId
                         , messageId: mes.id
                         }
                  )

                pure (model { inputBox = InputBox.default })
              else
                pure errorMsg
             )
        )
        # fromMaybe (pure model)
      else if startsWith "/edit " content then
        (do
           mid <- model.messageParent
           { value: mes } <- TreeMap.lookup mid model.state.messages

           Just
             (if mes.authorId == userId then do
                liftEffect
                  (pushEvent model
                     \_ ->
                       EventPayload_MessageEdit
                         { convoId
                         , messageId: mes.id
                         , authorId: userId
                         , content: String.drop 6 content
                         }
                  )

                pure (model { inputBox = InputBox.default })
              else
                pure errorMsg
             )
        )
        # fromMaybe (pure model)
      else do
        id :: Id "Message" <- liftEffect Id.new

        liftEffect do
          pushEvent model
            \instant ->
              EventPayload_MessageSend
                { convoId
                , message:
                    { id
                    , timeSent: instant
                    , authorId: model.userId
                    , convoId
                    , deleted: false
                    , depIds:
                        model.messageParent
                        <#> Set.singleton
                        # fromMaybe mempty
                    , content: InputBox.content model.inputBox
                    }
                }

        pure
          (model
             { inputBox = InputBox.default
             , messageParent = Nothing
             , thread =
                 case model.thread of
                   Nothing -> Just id
                   _ -> model.thread
             }
          )

    UpdateInputBox content height ->
      let
        model2 = model { inputBox = InputBox.update content height model.inputBox }
      in
      if content == "/edit " then
        pure
        $ (do
             mid <- model2.messageParent
             { value: mes } <- TreeMap.lookup mid model2.state.messages
             Just
               if mes.deleted then
                 model2
               else
                 model2
                   { inputBox =
                       InputBox.update
                         ("/edit " <> mes.content)
                         height
                         model.inputBox
                   }
          )
          # fromMaybe model2
      else
        pure model2

    TransmissionReceived mtc ->
      case mtc of
        Just (ToClient_Broadcast events) -> do
          focused <- liftEffect hasFocus

          let
            newEvents = addEvents model.state.events events
            processedEvents = processEvents newEvents

            names :: Map (Id "User") String
            names = processedEvents.names

            messages :: MessageTree
            messages = processedEvents.messages

            newLeaf :: Id "Message" -> Maybe (Id "Message")
            newLeaf = TreeMap.findNewLeaf ~$ model.state.messages ~$ messages

            model2 =
              model
                { state = { events: newEvents, names, messages }
                , nameInput =
                    if model.nameInput == "" then
                      Map.lookup userId names
                      # fromMaybe ""
                    else
                      model.nameInput
                , messageParent = model.messageParent >>= newLeaf
                , thread = model.thread >>= newLeaf
                , unread = if focused then false else true
                }

            firstMessage :: Maybe Message
            firstMessage =
              splitEvents events
              # _.messageSend
              # List.head
              <#> _.message

          liftEffect
            (case firstMessage of
               Just mes ->
                 if mes.authorId == userId then
                   pure unit
                 else
                   sendNotification
                     (getName mes.authorId model2.state.names)
                     mes.content

               Nothing -> pure unit
            )

          case model2.thread of
            Just mid ->
              let mleaf = TreeMap.findLeaf mid messages in
              pure
              $ model2
                  { thread = mleaf
                  , messageParent =
                      if InputBox.content model.inputBox == "" then
                        mleaf
                      else
                        model2.messageParent
                  }

            Nothing -> pure model2

        Nothing -> pure model

    WebSocketOpened -> do
      liftEffect do
        Ws.transmit (ToServer_Subscribe { userId, convoId }) model.wsClient
        Ws.transmit (ToServer_Pull { convoId }) model.wsClient
      pure model

pushEvent :: ∀ a r.
  { convoId :: Id "Convo"
  , wsClient :: Client ToServer a
  | r
  }
  -> (Instant -> EventPayload)
  -> Effect Unit
pushEvent { convoId, wsClient } payload = do
  eventId :: Id "Event" <- Id.new
  now <- Instant.getNow
  Ws.transmit
    (ToServer_Push
       { convoId
       , event:
           Event
             { id: eventId
             , time: now
             , payload: payload now
             }
       }
    )
    wsClient

addEvents :: Array Event -> Array Event -> Array Event
addEvents events newEvents =
  case oldEnd, newHead of
    Just (Event e1), Just (Event e2) ->
      if e1.time <= e2.time then
        potentialFinalArray
      else
        Array.sortWith eventTime potentialFinalArray
    _, _ -> potentialFinalArray

  where
    oldEnd :: Maybe Event
    oldEnd = Array.unsnoc events <#> _.last

    sortedEvents :: Array Event
    sortedEvents = Array.sortWith eventTime newEvents

    newHead :: Maybe Event
    newHead = Array.uncons sortedEvents <#> _.head

    potentialFinalArray :: Array Event
    potentialFinalArray = events <> sortedEvents

eventTime :: Event -> Instant
eventTime (Event e) = e.time

processEvents ::
  Array Event
  -> { names :: Map (Id "User") String
     , messages :: MessageTree
     }
processEvents =
  splitEvents
  .> \events ->
       { names:
           foldl
             (\acc { userId, name } ->
                Map.insert userId name acc
             )
             Map.empty
             events.setName
       , messages:
           let
             initialTM :: MessageTree
             initialTM =
               events.messageSend
               <#> _.message .> toIVP
               # toTreeMap
           in
           foldl
             (\acc { messageId } ->
                acc
                # TreeMap.edit messageId
                    (\vpc -> vpc { value = vpc.value { deleted = true } })
                # TreeMap.removeLeafRecursive
                    (_.value .> _.deleted)
                    messageId
             )
             initialTM
             events.messageDelete
           # foldl
               (\acc { messageId, content } ->
                  acc
                  # TreeMap.edit messageId
                      \vpc -> vpc { value = vpc.value { content = content } }
               )
           ~$ events.messageEdit
       }

splitEvents ::
  Array Event
  -> { setName ::
         List
           { convoId :: Id "Convo"
           , userId :: Id "User"
           , name :: String
           }
     , messageSend ::
         List
           { convoId :: Id "Convo"
           , message :: Message
           }
     , messageEdit ::
         List
           { convoId :: Id "Convo"
           , messageId :: Id "Message"
           , authorId :: Id "User"
           , content :: String
           }
     , messageDelete ::
         List
           { convoId :: Id "Convo"
           , userId :: Id "User"
           , messageId :: Id "Message"
           }
     }
splitEvents =
  foldr
    (\(Event event) acc ->
       case event.payload of
         EventPayload_SetName data' ->
           acc { setName = data' : acc.setName }

         EventPayload_MessageSend data' ->
           acc { messageSend = data' : acc.messageSend }

         EventPayload_MessageEdit data' ->
           acc { messageEdit = data' : acc.messageEdit }

         EventPayload_MessageDelete data' ->
           acc { messageDelete = data' : acc.messageDelete }

         _ -> acc
    )
    mempty

toIVP :: Message -> IVP (Id "Message") Message
toIVP value@{ id, depIds } =
  { id
  , value
  , parent: Set.findMax depIds
  }

subscriptions :: Model -> Sub Msg
subscriptions model =
  batch
    [ wsToSub TransmissionReceived model.wsClient
    , Sub.on "keydown" hitEnter
    , Sub.on "focus" focusHandler
    ]

focusHandler :: HTML.Event -> Effect (Maybe Msg)
focusHandler _ = pure $ Just Focused

hitEnter :: HTML.Event -> Effect (Maybe Msg)
hitEnter =
  HTML.toMaybeKeyboardEvent
  .> case _ of
      Just kbe ->
        if HTML.key kbe == "Enter" then do
          document <- HTML.window >>= HTML.document
          body <- HTML.unsafeBody document
          bind (HTML.activeElement document)
            case _ of
              Just activeElement ->
                if (RefEq body == RefEq activeElement) then do
                  bind
                    (HTML.getElementById inputId document # map HTML.toMaybeHTMLElement)
                    (maybe (pure unit) (HTML.focus {}))

                  HTML.preventDefault kbe
                  pure Nothing
                else
                  pure Nothing

              Nothing -> pure Nothing
        else
          pure Nothing

      Nothing -> pure Nothing

view ::
  Model
  -> { head :: Array (Html Msg)
     , body :: Array (Html Msg)
     }
view model =
  { head: [ H.title $ "⅄" <> if model.unread then " (unread messages)" else "" ]
  , body:
      [ Ds.staticStyles
      , H.divS
          [ C.display "grid"
          , C.grid "100vh / min(30%, 350px) 1fr"
          ]
          []
          [ H.divS [ Ds.panel ] []
              [ nameChanger model
              , threadBar model
              ]
          , threadView model
          ]
      ]
  }

nameChanger :: Model -> Html Msg
nameChanger model =
  H.divS [ C.margin ".3em" ] []
    [ H.inputS
        [ Ds.inputStyles
        , C.border "none"
        , C.borderRadius "5px"
        , C.padding "3px"
        ]
        [ A.value model.nameInput
        , A.onInput UpdateNameInput
        ]
    , H.buttonS [ C.marginLeft "5px" ] [ A.onClick UpdateName ] [ H.text "Update Name"]
    ]

threadBar :: Model -> Html Msg
threadBar model =
  let
    leaves :: Array (Id "Message")
    leaves =
      TreeMap.leaves model.state.messages
      # Array.sortBy
          (\a b ->
            compare
              ((snd b).value).timeSent
              ((snd a).value).timeSent
          )
      <#> fst
  in
  batch
    [ H.divS [ C.margin "5px" ] []
        [ H.button [ A.onClick NewThread ] [ H.text "New Thread" ] ]
    , H.divS
        [ C.overflow "auto"
        , C.borderJ [ Ds.vars.borderWidth1, "solid" ]
        ]
        []
      $ leaves
      <#> \mid ->
            TreeMap.lookup mid model.state.messages
            # case _ of
                Just { value: { content, deleted } } ->
                  if deleted then
                    mempty
                  else
                    H.divS
                      [ if model.thread == Just mid then
                          C.background Ds.vars.accent1
                        else
                          mempty
                      , Ds.following [ C.borderTop "1px solid" ]
                      , C.padding ".3em"
                      , C.whiteSpace "pre-wrap"
                      , C.overflow "auto"
                      ]
                      [ onNotSelectingClick $ SelectThreadRoot mid ]
                      [ H.text content ]

                Nothing -> mempty
    ]

inputId :: String
inputId = "input"

type IsSibling = Boolean

threadView :: Model -> Html Msg
threadView model =
  H.divS
    [ Ds.panel
    , C.transform
      $ CF.translateX
      $ CF.calc
      $ CF.sub "0px" Ds.vars.borderWidth1
    ]
    []
    [ maybe mempty messageList mthread
    , messageInput
    ]

    where
      mthread :: Maybe (Thread Message)
      mthread =
        model.thread
        >>= TreeMap.getThread ~$ model.state.messages

      messageInput :: Html Msg
      messageInput =
        H.divS
          [ C.display "flex"
          , C.width $ CF.calc $ CF.add "100%" Ds.vars.borderWidth1
          ]
          []
          [ H.textareaS
              [ C.height $ C.px $ InputBox.height model.inputBox
              , C.flex "1"
              , C.borderJ [ C.px Ds.inputBoxBorderWidth, "solid", Ds.vars.color ]
              , C.padding ".45em"
              , Ds.inputStyles
              , C.borderTop "none"
              ]
              [ A.id inputId
              , A.value $ InputBox.content model.inputBox
              , inputWithHeight
              , detectSendMessage
              ]
              []
          , H.button [ A.onClick SendMessage ] [ H.text "Send" ]
          ]

      messageList :: Thread Message -> Html Msg
      messageList =
        Array.fromFoldable
        .> map
             (\(message /\ siblings) ->
                let
                  createMessage :: IsSibling -> Styles -> Message -> Html Msg
                  createMessage isSibling styles mes =
                    H.divS
                      [ Ds.following [ C.borderBottom "1px solid" ]
                      , C.position "relative"
                      , C.padding "3px .25em 6px .25em"
                      , styles
                      ]
                      [ onNotSelectingClick
                        $ (if isSibling then SelectSibling else SelectMessageParent)
                            mes.id
                      ]
                      [ if model.messageParent == Just mes.id then
                          H.divS
                            [ C.position "absolute"
                            , C.background
                              $ CF.linearGradient
                                  [ "to right"
                                  , Ds.vars.accent1 <> " 20%"
                                  , "transparent"
                                  ]
                            , C.width "20px"
                            , C.height "100%"
                            , C.top "0"
                            , C.left "0"
                            ]
                            []
                            []
                        else
                          mempty
                      , if mes.deleted then
                          mempty
                        else
                          H.divS
                            [ C.font "0.72em sans-serif"
                            , C.opacity "0.6"
                            , C.marginBottom "0.7em"
                            ]
                            []
                            [ H.text $ getName mes.authorId model.state.names
                            , getParent mes model.state.messages
                              <#> formatTimeDiff <. _.timeSent ~$ mes.timeSent
                              # case _ of
                                  Just diff ->
                                    H.spanS [ C.marginLeft "12px" ]
                                    [ A.title $ dateString $ asMilliseconds mes.timeSent ]
                                    [ H.text diff ]

                                  Nothing -> mempty
                            ]
                      , H.divS
                          [ C.whiteSpace "pre-wrap"
                          , C.position "relative"
                          , C.overflowX "auto"
                          , C.marginTop "3px"
                          ]
                          []
                          [ H.text
                              if mes.deleted then
                                "(deleted)"
                              else
                                mes.content
                          ]
                      ]
                in
                batch
                $ Array.snoc
                    (siblings
                     <#> createMessage true (C.background Ds.vars.lighterBackground22)
                    )
                    (createMessage false (C.background Ds.vars.background) message)
                # Array.reverse
             )
        .> \messagesHtml ->
             H.divS
               [ C.borderJ [ Ds.vars.borderWidth1, "solid" ]
               , C.overflow "auto"
               , C.display "flex"
               , C.flexDirection "column-reverse"
               , C.width $ CF.calc $ CF.sub "100%" Ds.vars.borderWidth1
               ]
               []
               messagesHtml

getName :: Id "User" -> Map (Id "User") String -> String
getName id names = Map.lookup id names # fromMaybe "<anonymous>"

foreign import dateString :: Number -> String

getParent :: Message -> MessageTree -> Maybe Message
getParent { id } tm =
  TreeMap.lookup id tm
  >>= _.parent
  >>= TreeMap.lookup ~$ tm
  <#> _.value

formatTimeDiff :: Instant -> Instant -> String
formatTimeDiff iOld iNew =
  let
    seconds = (asMilliseconds iNew - asMilliseconds iOld) / 1000.0

    show' time label = show (round time) <> label
  in
  if round seconds < 120 then
    show' seconds "s"
  else
    let minutes =  seconds / 60.0 in
    if round minutes < 120 then
      show' minutes "m"
    else
      let hours = minutes / 60.0 in
      if hours < 48.0 then
        show' hours "h"
      else
        let days = hours / 24.0 in
        if days < 14.0 then
          show' days "d"
        else
        show' (days / 7.0) "w"


inputWithHeight :: Attribute Msg
inputWithHeight =
  A.on "input"
  $ HTML.unsafeTarget
  .> HTML.toMaybeHTMLTextAreaElement
  .> case _ of
       Just elem ->
         lift2
           (\content height ->
              Just
              $ UpdateInputBox
                  content
                  (height + Ds.inputBoxBorderWidth)
           )
           (TextArea.value elem)
           (toNumber <$> HTML.scrollHeight elem)

       Nothing -> pure Nothing

detectSendMessage :: Attribute Msg
detectSendMessage =
  A.on "keydown"
  $ HTML.toMaybeKeyboardEvent
  .> case _ of
       Just kbe ->
         if HTML.key kbe == "Enter" && (HTML.ctrlKey kbe || HTML.metaKey kbe) then do
           HTML.preventDefault kbe
           pure $ Just SendMessage
         else
           pure Nothing

       Nothing -> pure Nothing

foreign import isSelecting :: Effect Boolean

onNotSelectingClick :: Msg -> Attribute Msg
onNotSelectingClick =
  A.on "click" <. P.producer onNotSelectingClickRE

onNotSelectingClickRE :: Msg -> HTML.Event -> Effect (Maybe Msg)
onNotSelectingClickRE msg =
  \_ -> do
    selecting <- isSelecting

    if selecting then
      pure Nothing
    else
      pure $ Just msg
