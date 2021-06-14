module Design where

import Css as C
import Css.Global as CG
import Html (Html)

staticStyles :: ∀ a. Html a
staticStyles =
  CG.style
    [ CG.body
        [ C.margin "0"
        , C.fontFamily "monospace"
        ]
    ]
