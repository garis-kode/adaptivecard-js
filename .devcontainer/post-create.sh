#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")/.."

echo "::step::installing bun dependencies"
bun install --frozen-lockfile

echo "::step::installing antigravity cli"
curl -fsSL https://antigravity.google/cli/install.sh | bash

echo "::step::done"
