module Design
  ( following
  , inputBoxBorderWidth
  , inputStyles
  , panel
  , staticStyles
  , vars
  )
  where

import MasonPrelude

import Css (Styles)
import Css as C
import Css.Functions as CF
import Css.Global as CG
import Css.Variables (mkVarStyles, mkVarValues)
import Html (Html)
import Platform (batch)
import Record (disjointUnion)

varRec =
  disjointUnion
    values
    { accent1: valVars.purple1
    , background: makeBackground 12
    , color: values.gray1
    , lighterBackground22: makeBackground 22
    , lighterBackground32: makeBackground 32
    , lighterBackground60: makeBackground 60
    }

makeBackground :: Int -> String
makeBackground percent =
  CF.hsl
    valVars.hue1
    valVars.saturation1
  $ show percent <> "%"

values =
  { borderWidth1: "1px"
  , hue1: "0"
  , gray1: "#e6e6e6"
  , purple1: "#634372"
  , saturation1: "0%"
  }

valVars = mkVarValues {} values
vars = mkVarValues {} varRec

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
    , CG.button
        [ C.background vars.lighterBackground32
        , C.color vars.color
        , C.border "none"
        , C.variable "padding" "4px"
        , C.paddingTop $ CF.var "padding"
        , C.paddingBottom $ CF.var "padding"
        , C.fontFamily "monospace"
        ]
    , CG.rule "::-webkit-scrollbar"
        [ C.visibility "hidden" ]
    , CG.rule "::-webkit-scrollbar-thumb"
        [ C.background vars.lighterBackground60
        , C.borderRadius "4px"
        ]
    , CG.rule "::-webkit-scrollbar-track"
        [ C.background vars.lighterBackground22 ]
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

inputStyles :: Styles
inputStyles =
  batch
    [ C.outline "none"
    , C.background vars.lighterBackground22
    , C.color vars.color
    , C.fontFamily "monospace"
    ]
