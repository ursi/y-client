module InputBox
  ( InputBox
  , content
  , default
  , height
  , prevContent
  , reset
  , setContent
  , undo
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

defaultHeight :: Number
defaultHeight = 30.0

default :: InputBox
default =
  InputBox
    { content: ""
    , prevContent: ""
    , height: defaultHeight
    }

-- | store current content in prevContent
reset :: InputBox -> InputBox
reset (InputBox r) =
  InputBox
    { content: ""
    , prevContent: r.content
    , height: defaultHeight
    }

setContent :: String -> InputBox -> InputBox
setContent newContent (InputBox r) =
  InputBox
  $ r { content = newContent
      , prevContent = r.content
      }

undo :: InputBox -> InputBox
undo (InputBox r) =
  InputBox
  $ r { content = r.prevContent
      , prevContent = r.content
      }

prevContent :: InputBox -> String
prevContent (InputBox r) = r.prevContent
