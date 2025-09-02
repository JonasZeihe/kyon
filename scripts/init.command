#!/usr/bin/env bash
# (C) 2025 Jonas Zeihe, MIT License. Developer: Jonas Zeihe. Contact: JonasZeihe@gmail.com

set -e
cd "$(dirname "$0")"

echo "Making all .command files executable..."

find ./mac -type f -name "*.command" -exec chmod +x {} \;

echo "Done."
read -p "Press [Enter] to close this window."
