{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    bun
  ];

  shellHook = ''
    if [ ! -d node_modules ]; then
      bun i
    fi

    if [ ! -d $HOME/.cache/.bun/install/global/node_modules/vercel ]; then
      bun i -g vercel
    fi
    export PATH="/home/liz/.cache/.bun/bin:$PATH"
  '';
}
