module Main where

import MasonPrelude

import Attribute as A
import Data.Array as Array
import Data.List ((:))
import Data.Map (Map)
import Data.Map as Map
import Data.Set as Set
import Debug as Debug
import Html (Html)
import Html as H
import Platform (Cmd(..), Program, Update, tell)
import Platform as Platform
import Sub (Sub)
import TreeMap (IVP, TreeMap, toTreeMap)
import WebSocketSub (wsToSub)
import Y.Client.WebSocket (Client)
import Y.Client.WebSocket as Ws
import Y.Shared.Config as Config
import Y.Shared.Event (Event(..), EventPayload(..))
import Y.Shared.Id (Id(..))
import Y.Shared.Id as Id
import Y.Shared.Message (Message)
import Y.Shared.Transmission (ToClient(..), ToServer(..))
import Y.Shared.Transmission as Transm
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
  , events :: Array Event
  , currentMessage :: String
  }

init :: Unit -> Update Msg Model
init _ = do
  -- Initialize state
  userId /\ convoId <- liftEffect do
    freshUserId /\ freshConvoId <- liftEffect $ lift2 Tuple Id.new Id.new
    initialize_f Tuple freshUserId freshConvoId

  -- Spin up websocket
  hostname <- liftEffect getHostname
  wsClient <-
    liftEffect
    $ Ws.newConnection { url: "ws://" <> hostname <> ":" <> show Config.webSocketPort }

  tell
    $ Cmd
        (\msgCallback -> do
           Ws.onOpen
             (do
                log "WebSocket opened"
                msgCallback WebSocketOpened
             )
             wsClient
        )

  pure
    { convoId
    , userId
    , wsClient
    , events: []
    , currentMessage: ""
    }

data Msg
  = WebSocketOpened
  | TransmissionReceived (Maybe ToClient)
  | UpdateMessage String
  | SendMessage

instance Eq Msg where
  eq m1 m2 = case m1, m2 of
    UpdateMessage s1, UpdateMessage s2 -> s1 == s2
    SendMessage, SendMessage -> true
    WebSocketOpened, WebSocketOpened -> true
    _, _ -> false

update :: Model -> Msg -> Update Msg Model
update model@{ userId, convoId } =
  let
    _ = Debug.log model
  in
  case _ of
    SendMessage -> do
      liftEffect do
        id :: Id "Message" <- Id.new
        pushEvent model
          \instant ->
            EventPayload_MessageSend
              { convoId
              , message:
                  { id
                  , timeSent: instant
                  , authorId: model.userId
                  , convoId
                  , depIds: mempty
                  , content: model.currentMessage
                  }
              }

      pure $ model { currentMessage = "" }
    UpdateMessage str -> pure $ model { currentMessage = str }
    TransmissionReceived mtc -> case mtc of
      Just (ToClient_Broadcast events) ->
        pure $ model { events = addEvents model.events events }

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
  List Event
  -> { names :: Map (Id "User") String
     , messages :: TreeMap (Id "Message") Message
     }
processEvents =
  splitEvents
  >>> \{ nameEvents, messageEvents } ->
        { names: Map.empty
        , messages:
            messageEvents
            <#> _.message .> toIVP
            # toTreeMap
        }

splitEvents ::
  List Event
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
      [ H.div []
          [ H.input
              [ A.value model.currentMessage
              , A.onInput UpdateMessage
              ]
          , H.button [ A.onClick SendMessage ] [ H.text "send" ]
          ]
      ]
  }

      -- (let
      --    threadView :: Thread Message -> Html Action
      --    threadView =
      --      Array.fromFoldable
      --      >>> map
      --            (\(message /\ siblings) ->
      --               let
      --                 createMessage :: Styles -> Message -> Html Action
      --                 createMessage styles mes =
      --                   H.divS
      --                     [ S.border "1px solid darkgray"
      --                     , styles
      --                     ]
      --                     []
      --                     [ H.divS
      --                         [ S.fontSize "0.75em"
      --                         , S.fontStyle "italic"
      --                         , S.opacity "0.5"
      --                         , S.marginBottom "0.5em"
      --                         , S.paddingTop "1px"
      --                         ]
      --                         []
      --                         [ H.text "Mason" ]
      --                     , H.div [] [ H.text mes.content ]
      --                     ]
      --               in
      --               batch
      --               $ Array.snoc
      --                   (siblings <#> createMessage (S.background "lightgray"))
      --                   (createMessage (S.background "white") message)
      --               # Array.reverse
      --            )
      --      >>> H.divS
      --            [ S.border "1px solid"
      --            , S.maxHeight "300px"
      --            , S.overflow "auto"
      --            , S.display "flex"
      --            , S.flexDirection "column-reverse"
      --            ]
      --            []
      --  in
      --  H.divS
      --    [ S.position "absolute"
      --    , S.width "30%"
      --    , S.top "0"
      --    , S.left "0"
      --    , S.border "1px solid black"
      --    , S.zIndex "1"
      --    , S.overflow "auto"
      --    , S.height "100%"
      --    ]
      --    []
      --  $ (let
      --       { names, messages } =
      --         Debug.log $ processEvents model.convo.events ::
      --           { names :: Map (Id "User") String
      --           , messages :: TreeMap (Id "Message") Message
      --           }

      --       threads :: Array (Thread Message)
      --       threads =
      --         Debug.log
      --         $ Tree.getThreads messages
      --         # Array.sortBy
      --             \a b ->
      --               compare
      --                 (fst $ NEList.head b).timeSent
      --                 (fst $ NEList.head a).timeSent
      --     in
      --     threadView <$> threads
      --    )
