# scripts/mac/convert_images.command
#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
echo
echo "==============================="
echo "  Image Optimizer · WebP tool"
echo "==============================="
echo
python3 "../logic/convert_images.py" "$@"
echo
read -r -p "Press Enter to close..."
