module ModelMsg where

import MasonPrelude
import Data.Map (Map)
import Data.Set (Set)
import InputBox (InputBox)
import TreeMap (TreeMap)
import Y.Client.WebSocket (Client)
import Y.Shared.Event (Event)
import Y.Shared.Id (Id)
import Y.Shared.Message (Message)
import Y.Shared.Transmission (ToClient, ToServer)

type Model =
  { convoId :: Id "Convo"
  , userId :: Id "User"
  , wsClient :: Client ToServer ToClient
  , events :: Events
  , inputBox :: InputBox
  , thread :: Maybe Leaf
  , messageParent :: Maybe (Id "Message")
  , nameInput :: String
  , unread :: Boolean
  , notificationSound :: String
  }

type Leaf = (Id "Message")

type Events =
  { raw :: Array Event
  , folded :: FoldedEvents
  }

type FoldedEvents =
  { names :: Map (Id "User") String
  , messages :: MessageTree
  , read :: Set (Id "User" /\ Id "Message")
  }

type MessageTree = TreeMap (Id "Message") Message

type Height = Number

data InputAction = Edit

derive instance Eq InputAction

data Msg
  = WebSocketOpened
  | TransmissionReceived (Maybe ToClient)
  | UpdateInputBox (Maybe InputAction) Height
  | SendMessage
  | SelectThread (Id "Message")
  | NewThread
  | SelectMessageParent (Id "Message")
  | UpdateNameInput String
  | UpdateName
  | SelectSibling (Id "Message")
  | Undo
  | UpdateNotificationSound String
  | Focused

instance Eq Msg where
  eq =
    case _, _ of
      UpdateInputBox a1 h1, UpdateInputBox a2 h2 -> a1 == a2 && h1 == h2
      SendMessage, SendMessage -> true
      WebSocketOpened, WebSocketOpened -> true
      SelectThread m1, SelectThread m2 -> m1 == m2
      NewThread, NewThread -> true
      SelectMessageParent m1, SelectMessageParent m2 -> m1 == m2
      UpdateNameInput s1, UpdateNameInput s2 -> s1 == s2
      UpdateName, UpdateName -> true
      SelectSibling m1, SelectSibling m2 -> m1 == m2
      Focused, Focused -> true
      Undo, Undo -> true
      _, _ -> false
