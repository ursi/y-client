module InputBox
  ( InputBox
  , content
  , default
  , height
  , setContent
  , update
  )
  where

import MasonPrelude

newtype InputBox =
  InputBox
    { content :: String
    , prevContent :: String
    , height :: Number
    }

update :: String -> Number -> InputBox -> InputBox
update newContent height' (InputBox r) =
  InputBox
    { content: newContent
    , prevContent: r.content
    , height: height'
    }

height :: InputBox -> Number
height (InputBox r) = r.height

content :: InputBox -> String
content (InputBox r) = r.content

default :: InputBox
default =
  InputBox
    { content: ""
    , prevContent: ""
    , height: 30.0
    }

setContent :: String -> InputBox -> InputBox
setContent newContent (InputBox r) =
  InputBox
  $ r { content = newContent
      , prevContent = r.content
      }
