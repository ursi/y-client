{ build, ps-pkgs, y-repo, ... }:
  { websocket =
      build
        { name = "websocket";
          inherit (y-repo) repo rev;
          install = "mkdir $out; cp client/src/WebSocket.* $out";
        };

    y-shared =
      build
        { name = "y-shared";
          inherit (y-repo) repo rev;
          src = "shared/src";

          dependencies =
            with ps-pkgs;
            [ aff-promise
              argonaut-generic
              console
            ];
        };
  }
