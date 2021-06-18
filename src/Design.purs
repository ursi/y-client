module Design
  ( following
  , inputBoxBorderWidth
  , panel
  , staticStyles
  , vars
  )
  where

import MasonPrelude

import Css (Styles)
import Css as C
import Css.Global as CG
import Css.Variables (mkVarStyles, mkVarValues)
import Html (Html)
import Platform (batch)

varRec =
  { black: "black"
  , borderWidth1: "1px"
  , gray1: "lightgray"
  , red1: "#ff9e9e"
  , white: "white"
  }

vars =
  mkVarValues
    { background: Proxy :: Proxy "white"
    , color: Proxy :: Proxy "black"
    }
    varRec

staticStyles :: ∀ a. Html a
staticStyles =
  CG.style
    [ CG.body
        [ mkVarStyles varRec
        , C.margin "0"
        , C.fontFamily "monospace"
        , C.background vars.background
        , C.color vars.color
        ]
    ]

panel :: Styles
panel =
  batch
    [ C.display "grid"
    , C.gridAutoRows "fit-content(100%)"
    ]

inputBoxBorderWidth :: Number
inputBoxBorderWidth = 1.0

following :: Array Styles -> Styles
following = C.mapSelector $ C.prepend "* + "
