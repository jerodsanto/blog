#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/assets/scripts.js"
TARGET="$ROOT/layouts/_default/baseof.html"

if ! command -v terser &>/dev/null; then
  echo "Error: terser is not installed. Run: npm install -g terser" >&2
  exit 1
fi

JSFILE=$(mktemp)
terser "$SRC" --compress --mangle | tr -d '\n' > "$JSFILE"

JSFILE="$JSFILE" perl -i -0777 -pe '
  BEGIN {
    local $/;
    open my $fh, "<", $ENV{JSFILE} or die $!;
    $js = <$fh>;
    close $fh;
  }
  s|<script>.*?</script>(\s*</body>)|<script>${js}</script>$1|s;
' "$TARGET"

src_size=$(wc -c < "$SRC" | tr -d ' ')
min_size=$(wc -c < "$JSFILE" | tr -d ' ')
rm "$JSFILE"

echo "Inlined ${src_size}b → ${min_size}b into baseof.html"
