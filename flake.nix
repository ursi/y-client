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
               rev = "6780641af1bc264c27d4d8795eea8fb74f3b8161";
             };

           y = fetchGit { url = y-repo.repo; inherit (y-repo) rev; };

           extra-deps =
             import ./extra-dependencies.nix
               (purs-nix // { inherit y-repo; });

           inherit
             (purs
                { dependencies =
                    with ps-pkgs;
                    let inherit (ps-pkgs-ns) ursi; in
                    [ stringutils
                      ursi.elmish
                      ursi.prelude
                      extra-deps.websocket
                      extra-deps.y-shared
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
      )
      inputs;
}
