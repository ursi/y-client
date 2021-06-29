module Input where

import Attribute (Attribute)
import Attribute as A
import Css as C
import Data.Symbol (class IsSymbol)
import Design as Ds
import Effect.Ref (Ref)
import Effect.Ref as Ref
import Html (Html, textareaS)
import InputBox (InputBox)
import InputBox as IB
import MasonPrelude
import ModelMsg (Height, InputAction(..), Model, Msg(..))
import Platform (afterRender, Update)
import Prim.Row (class Cons)
import Record as Record
import RefEq (RefEq(..))
import WHATWG.HTML.All as H
import WHATWG.HTML.All (Event)
import WHATWG.HTML.HTMLTextAreaElement as TextArea

ref :: Ref InputBox
ref = unsafePerformEffect $ Ref.new IB.default

infuse :: ∀ model msg.
  (model -> InputBox -> model) ->
  (model -> InputBox) ->
  (model -> msg -> Update msg model) ->
  (model -> msg -> Update msg model)
infuse addIb getIb update =
  \model msg -> do
  currentInputBox <- liftEffect $ Ref.read ref
  newModel <- update (addIb model currentInputBox) msg
  liftEffect $ Ref.write (getIb newModel) ref
  pure newModel

infuseRec :: ∀ msg l r r'.
  IsSymbol l =>
  Cons l InputBox r' r
  => Proxy l
  -> ((Record r) -> msg -> Update msg (Record r))
  -> ((Record r) -> msg -> Update msg (Record r))
infuseRec _ =
  let _l = Proxy :: _ l in
  infuse
    (flip $ Record.set _l)
    (Record.get _l)

id :: String
id = "input"

html :: Model -> Html Msg
html model =
  textareaS
     [ C.height $ C.px $ IB.height model.inputBox
     , C.flex "1"
     , C.borderJ [ C.px Ds.inputBoxBorderWidth, "solid", Ds.vars.color ]
     , C.padding ".45em"
     , Ds.inputStyles
     , C.borderTop "none"
     ]
     [ A.id id
     , A.noDiff $ A.value $ IB.content model.inputBox
     , inputWithHeight
     , detectInputEvents
     ]
     []

inputWithHeight :: Attribute Msg
inputWithHeight =
  A.on "input"
  $ H.unsafeTarget
    .> H.toMaybeHTMLTextAreaElement
    .> case _ of
         Just elem -> do
           content <- TextArea.value elem
           scrollHeight <- toNumber <$> H.scrollHeight elem
           let height = scrollHeight + Ds.inputBoxBorderWidth
           oldIb <- Ref.read ref

           Ref.modify_
             (IB.update
                content
                height
             )
             ref

           let
             helper ::
               Boolean ->
               (Maybe InputAction /\ Height ->
                Maybe InputAction /\ Height
               ) ->
               Maybe (Maybe InputAction /\ Height) ->
               Maybe (Maybe InputAction /\ Height)
             helper b update ma =
              let helper2 a = if b then Just $ update a else ma in
              case ma of
                Just a -> helper2 a
                Nothing -> helper2 $ Nothing /\ height

           pure
             (Nothing
              # helper (height /= IB.height oldIb)
                  (\(a /\ _) -> a /\ height)
              # helper (content == "/edit " && IB.content oldIb == "/edit")
                  (\(_ /\ h) -> Just Edit /\ h)
              <#> uncurry UpdateInputBox
             )

         Nothing -> pure Nothing

detectInputEvents :: Attribute Msg
detectInputEvents =
  A.on "keydown"
  $ H.toMaybeKeyboardEvent
    .> case _ of
         Just kbe ->
           if H.key kbe == "Enter" && (H.ctrlKey kbe || H.metaKey kbe) then do
             H.preventDefault kbe
             pure $ Just SendMessage
           else if H.key kbe == "z" && H.ctrlKey kbe then do
             H.preventDefault kbe
             pure $ Just Undo
           else
             pure Nothing

         Nothing -> pure Nothing

focusInput :: ∀ a. Update a Unit
focusInput =
  afterRender
  $ H.document'
    >>= H.getElementById id .> map H.toMaybeHTMLElement
    >>= maybe (pure unit) (H.focus {})

hitEnter :: Event -> Effect (Maybe Msg)
hitEnter =
  H.toMaybeKeyboardEvent
  .> case _ of
      Just kbe ->
        if H.key kbe == "Enter" then do
          document <- H.document'
          body <- H.unsafeBody document
          bind (H.activeElement document)
            case _ of
              Just activeElement ->
                if (RefEq body == RefEq activeElement) then do
                  bind
                    (H.getElementById id document # map H.toMaybeHTMLElement)
                    (maybe (pure unit) (H.focus {}))

                  H.preventDefault kbe
                  pure Nothing
                else
                  pure Nothing

              Nothing -> pure Nothing
        else
          pure Nothing

      Nothing -> pure Nothing
