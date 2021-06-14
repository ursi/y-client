{ inputs =
    { nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
      purs-nix.url = "github:ursi/purs-nix";
      utils.url = "github:ursi/flake-utils/2";
    };

  outputs = { utils, ... }@inputs:
    utils.default-systems
      ({ make-shell, pkgs, purs-nix, ... }:
         let
           inherit (purs-nix) build ps-pkgs ps-pkgs-ns purs;

           y-repo =
             { repo = "https://github.com/Quelklef/y.git";
               rev = "c311e1e4bb6d0f904e78581f1764339caeba3c7b";
             };

           inherit
             (purs
                { dependencies =
                    with ps-pkgs;
                    let inherit (ps-pkgs-ns) ursi; in
                    [ ursi.elmish
                      ursi.prelude
                      (build
                         { name = "y-shared";
                           inherit (y-repo) repo rev;
                           src = "shared/src";

                           dependencies =
                             with ps-pkgs;
                             [ argonaut-generic
                               console
                             ];
                         }
                      )
                      (build
                         { name = "websocket";
                           inherit (y-repo) repo rev;
                           src = " . ; mkdir $out; cp client/src/WebSocket.* $out; :";
                         }
                      )
                    ];
                }
             )
             command;
         in
         { devShell =
             make-shell
               { packages =
                   with pkgs;
                   [ entr
                     nodejs
                     nodePackages.live-server
                     purs-nix.purescript
                     purs-nix.purescript-language-server
                     (command {})
                   ];

                 aliases.watch = "find src | entr -s 'echo bundling; purs-nix bundle'";
               };
         }
      )
      inputs;
}
