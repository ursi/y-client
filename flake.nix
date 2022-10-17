{ inputs =
    { make-shell.url = "github:ursi/nix-make-shell/1";
      nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
      ps-tools.follows = "purs-nix/ps-tools";
      purs-nix.url = "github:ursi/purs-nix/ps-0.15";
      utils.url = "github:ursi/flake-utils/8";
    };

  outputs = { utils, ... }@inputs:
    utils.apply-systems { inherit inputs; }
      ({ make-shell, pkgs, ps-tools, purs-nix, ... }:
         let
           inherit (purs-nix) build ps-pkgs ps-pkgs-ns purs;

           y-repo =
             { repo = "https://github.com/Quelklef/y.git";
               rev = "4422547a0a484737b4f3e97410c4c893d2d130fc";
             };

           y = fetchGit { url = y-repo.repo; inherit (y-repo) rev; };

           inherit
             (purs
                { dependencies =
                    with ps-pkgs;
                    let inherit (ps-pkgs-ns) ursi; in
                    [ stringutils
                      ursi.elmish
                      ursi.prelude
                      (build
                         { name = "y-shared";
                           src.git = { inherit (y-repo) repo rev; };

                           info =
                             { src = "shared/src";

                               dependencies =
                                 with ps-pkgs;
                                 [ argonaut-generic
                                   console
                                   (build
                                      { name = "postgres";

                                        src.git =
                                          { repo = "https://github.com/Quelklef/purescript-postgres.git";
                                            rev = "cec8d32b614719bb21b7622dbd2d2fdb051fefcf";
                                          };

                                        info.dependencies =
                                          with ps-pkgs;
                                          [ aff
                                            effect
                                            lists
                                            arrays
                                            maybe
                                            either
                                            aff
                                            aff-promise
                                            argonaut-core
                                            argonaut-codecs
                                            argonaut-generic
                                            spec  # actually
                                         ];
                                      }
                                   )
                                   quickcheck
                                 ];
                             };
                         }
                      )
                      (build
                         { name = "websocket";
                           src.git = { inherit (y-repo) repo rev; };

                           info =
                             { src = "shared/src";
                               install = "mkdir $out; cp client/src/WebSocket.* $out";
                             };
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
                     ps-tools.for-0_15.purescript-language-server
                     (command {})
                   ];

                 aliases.watch = "find src | entr -s 'echo bundling; purs-nix bundle'";

                 functions.run-servers =
                   ''
                   trap : SIGINT
                   $(nix-build ${y}/server --no-out-link)/run.sh &
                   purs-nix bundle
                   live-server
                   kill %
                   '';
               };
         }
      );
}
