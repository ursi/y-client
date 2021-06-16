module Main (main) where

import MasonPrelude

import Attribute (Attribute)
import Attribute as A
import Css (Styles)
import Css as C
import Data.Array as Array
import Data.List ((:))
import Data.Map (Map)
import Data.Map as Map
import Data.Set as Set
import Debug as Debug
import Design as Ds
import Html (Html)
import Html as H
import Platform (Cmd(..), Program, Update, afterRender, batch, tell)
import Platform as Platform
import Sub (Sub)
import TreeMap (IVP, Thread, TreeMap, toTreeMap)
import TreeMap as TreeMap
import WebSocketSub (wsToSub)
import WHATWG.HTML.All as HTML
import WHATWG.HTML.HTMLTextAreaElement as TextArea
import Y.Client.WebSocket (Client)
import Y.Client.WebSocket as Ws
import Y.Shared.Config as Config
import Y.Shared.Event (Event(..), EventPayload(..))
import Y.Shared.Id (Id)
import Y.Shared.Id as Id
import Y.Shared.Message (Message)
import Y.Shared.Transmission (ToClient(..), ToServer(..))
import Y.Shared.Util.Instant (Instant)
import Y.Shared.Util.Instant as Instant

foreign import initialize_f :: ∀ a b r.  (Id a -> Id b -> r) -> Id a -> Id b -> Effect r
foreign import getHostname :: Effect String

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
  , selectedThreadRoot :: Maybe (Id "Message")
  , messageParent :: Maybe (Id "Message")
  , nameInput :: String
  }

type State =
  { events :: Array Event
  , names :: Map (Id "User") String
  , messages :: TreeMap (Id "Message") Message
  }

init :: Unit -> Update Msg Model
init _ = do
  userId /\ convoId <- liftEffect do
    freshUserId /\ freshConvoId <- liftEffect $ lift2 Tuple Id.new Id.new
    initialize_f Tuple freshUserId freshConvoId

  wsClient <-
    liftEffect do
      hostname <- getHostname
      Ws.newConnection { url: "ws://" <> hostname <> ":" <> show Config.webSocketPort }
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
    , inputBox: defaultInputBox
    , selectedThreadRoot: Nothing
    , messageParent: Nothing
    , nameInput: ""
    }

data Msg
  = WebSocketOpened
  | TransmissionReceived (Maybe ToClient)
  | UpdateInputBox InputBox
  | SendMessage
  | SelectThreadRoot (Id "Message")
  | NewThread
  | SelectMessageParent (Id "Message")
  | UpdateNameInput String
  | UpdateName
  | NoOp

instance Eq Msg where
  eq m1 m2 = case m1, m2 of
    UpdateInputBox i1, UpdateInputBox i2 -> i1 == i2
    SendMessage, SendMessage -> true
    WebSocketOpened, WebSocketOpened -> true
    SelectThreadRoot mid1, SelectThreadRoot mid2 -> mid1 == mid2
    NewThread, NewThread -> true
    SelectMessageParent mid1, SelectMessageParent mid2 -> mid1 == mid2
    UpdateNameInput s1, UpdateNameInput s2 -> s1 == s2
    UpdateName, UpdateName -> true
    NoOp, NoOp -> true
    _, _ -> false

type InputBox =
  { content :: String
  , height :: Number
  }

defaultInputBox :: InputBox
defaultInputBox = { content: "", height: 30.0 }

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
           { selectedThreadRoot = Nothing
           , messageParent = Nothing
           }
        )

    SelectThreadRoot mid -> do
      focusInput

      pure
        (model
           { selectedThreadRoot = Just mid
           , messageParent = Just mid
           }
        )

    SendMessage -> do
      focusInput

      if model.inputBox.content /= "" then
        do
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
                      , depIds:
                          model.messageParent
                          <#> Set.singleton
                          # fromMaybe mempty
                      , content: model.inputBox.content
                      }
                  }

          pure
            (model
               { inputBox = defaultInputBox
               , messageParent = Nothing
               , selectedThreadRoot =
                   case model.selectedThreadRoot of
                     Nothing -> Just id
                     _ -> model.selectedThreadRoot
               }
            )
      else
        pure model

    UpdateInputBox ib ->
      let model2 = model { inputBox = ib } in

      case model.selectedThreadRoot, model.messageParent of
        Just _, Nothing -> pure $ model2 { messageParent = model.selectedThreadRoot }
        _, _ -> pure model2

    TransmissionReceived mtc -> case mtc of
      Just (ToClient_Broadcast events) ->
        let
          newEvents = addEvents model.state.events events
          processedEvents = processEvents newEvents

          names :: Map (Id "User") String
          names = processedEvents.names

          messages :: TreeMap (Id "Message") Message
          messages = processedEvents.messages

          model2 =
            model
              { state = { events: newEvents, names, messages }
              , nameInput =
                  if model.nameInput == "" then
                    Map.lookup userId names
                    # fromMaybe ""
                  else
                    model.nameInput
              }
        in
        case model.selectedThreadRoot of
          Just mid ->
            let mleaf = TreeMap.findLeaf mid messages in
            pure
            $ model2
                { selectedThreadRoot = mleaf
                , messageParent =
                    if model.inputBox.content == "" then
                      mleaf
                    else
                      model.messageParent
                }

          Nothing -> pure model2

      Nothing -> pure model

    WebSocketOpened -> do
      liftEffect do
        Ws.transmit (ToServer_Subscribe { userId, convoId }) model.wsClient
        Ws.transmit (ToServer_Pull { convoId }) model.wsClient
      pure model

    NoOp -> pure model


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
     , messages :: TreeMap (Id "Message") Message
     }
processEvents =
  splitEvents
  >>> \{ nameEvents, messageEvents } ->
        { names:
            foldl
              (\acc { userId, name } ->
                 Map.insert userId name acc
              )
              Map.empty
              nameEvents
        , messages:
            messageEvents
            <#> _.message .> toIVP
            # toTreeMap
        }

splitEvents ::
  Array Event
  -> { nameEvents ::
         List
           { convoId :: Id "Convo"
           , userId :: Id "User"
           , name :: String
           }
     , messageEvents ::
         List
           { convoId :: Id "Convo"
           , message :: Message
           }
     }
splitEvents =
  foldr
    (\(Event event) acc@{ nameEvents, messageEvents } ->
       case event.payload of
         EventPayload_SetName data' ->
           acc { nameEvents = data' : nameEvents }

         EventPayload_MessageSend data' ->
           acc { messageEvents = data' : messageEvents }

         _ -> acc
    )
    { nameEvents: Nil
    , messageEvents: Nil
    }

toIVP :: Message -> IVP (Id "Message") Message
toIVP value@{ id, depIds } =
  { id
  , value
  , parent: Set.findMax depIds
  }

subscriptions :: Model -> Sub Msg
subscriptions model = wsToSub TransmissionReceived model.wsClient

view ::
  Model
  -> { head :: Array (Html Msg)
     , body :: Array (Html Msg)
     }
view model =
  { head: []
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
    [ H.input
        [ A.value model.nameInput
        , A.onInput UpdateNameInput
        ]
    , H.button [ A.onClick UpdateName ] [ H.text "Update Name"]
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
        [ C.overflow "auto" ]
        []
      $ leaves
      <#> \mid ->
            TreeMap.lookup mid model.state.messages
            # maybe "oops" (_.value .> _.content)
            # \mes ->
                H.divS
                  [ if model.selectedThreadRoot == Just mid then
                      C.background Ds.vars.red1
                    else
                      mempty
                  , C.border "1px solid"
                  , C.padding ".3em"
                  , C.whiteSpace "pre-wrap"
                  ]
                  [ A.onClick $ SelectThreadRoot mid ]
                  [ H.text mes ]
    ]

inputId :: String
inputId = "input"

threadView :: Model -> Html Msg
threadView model =
  let
    mthread :: Maybe (Thread Message)
    mthread =
      model.selectedThreadRoot
      >>= TreeMap.getThread ~$ model.state.messages

    messageInput :: Html Msg
    messageInput =
      H.div []
        [ H.textareaS
            [ C.height $ C.px  model.inputBox.height
            , C.width "100%"
            , C.borderWidth $ C.px Ds.inputBoxBorderWidth
            , C.padding ".45em"
            ]
            [ A.id inputId
            , A.value model.inputBox.content
            , inputWithHeight
            , detectSendMessage
            ]
            []
        ]
  in
  case mthread of
    Just thread ->
      Array.fromFoldable thread
      # map
          (\(message /\ siblings) ->
             let
               createMessage :: Styles -> Message -> Html Msg
               createMessage styles mes =
                 H.divS
                   [ C.border "1px solid darkgray"
                   , C.padding ".25em"
                   , C.position "relative"
                   , styles
                   ]
                   [ A.onClick $ SelectMessageParent mes.id ]
                   [ H.divS
                       [ C.font "0.7em sans-serif"
                       , C.opacity "0.5"
                       , C.marginBottom "0.5em"
                       , C.paddingTop "1px"
                       ]
                       []
                       [ H.text
                         $ Map.lookup mes.authorId model.state.names
                         # fromMaybe "<anonomous>"
                       ]
                   , H.divS [ C.whiteSpace "pre-wrap" ] [] [ H.text mes.content ]
                   , if model.messageParent == Just mes.id then
                       H.divS
                         [ C.position "absolute"
                         , C.background Ds.vars.red1
                         , C.width "20px"
                         , C.height "100%"
                         , C.top "0"
                         , C.right "0"
                         ]
                         []
                         []
                    else
                      mempty
                   ]
             in
             batch
             $ Array.snoc
                 (siblings <#> createMessage (C.background "lightgray"))
                 (createMessage (C.background "white") message)
             # Array.reverse
          )
      # \messagesHtml ->
          H.divS [ Ds.panel ] []
            [ H.divS
                [ C.border "1px solid"
                , C.overflow "auto"
                , C.display "flex"
                , C.flexDirection "column-reverse"
                ]
                []
                messagesHtml
            , messageInput
            ]

    Nothing -> messageInput

inputWithHeight :: Attribute Msg
inputWithHeight =
  A.on "input"
  $ HTML.unsafeTarget
  .> HTML.toMaybeHTMLTextAreaElement
  .> maybe (pure NoOp) \elem ->
      lift2
        (\content height ->
           UpdateInputBox
             { content
             , height: height + 2.0 * Ds.inputBoxBorderWidth
             }
        )
        (TextArea.value elem)
        (toNumber <$> HTML.scrollHeight elem)

detectSendMessage :: Attribute Msg
detectSendMessage =
  A.on "keydown"
  $ HTML.toMaybeKeyboardEvent
  .> maybe (pure NoOp)
       \kbe ->
         if
           HTML.key kbe == "Enter"
           && (HTML.ctrlKey kbe || HTML.metaKey kbe || HTML.shiftKey kbe)
         then do
           HTML.preventDefault kbe
           pure SendMessage
         else
           pure NoOp
