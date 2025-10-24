#!/bin/bash

# Count cumulative GitHub release downloads for ZaparooProject/zaparoo-core
# Requires: curl, jq

REPO="ZaparooProject/zaparoo-core"
API_URL="https://api.github.com/repos/${REPO}/releases"

echo "Fetching release data for ${REPO}..."

# Fetch all releases and sum download counts
TOTAL=$(curl -s "${API_URL}?per_page=100" | \
  jq '[.[] | .assets[] | .download_count] | add')

if [ "$TOTAL" = "null" ] || [ -z "$TOTAL" ]; then
  echo "Error: Could not fetch download data"
  exit 1
fi

echo ""
echo "========================================="
echo "  Total Downloads: ${TOTAL}"
echo "========================================="
echo ""

# Show breakdown by release
echo "Breakdown by release:"
echo ""
curl -s "${API_URL}?per_page=100" | \
  jq -r '.[] | "\(.name // .tag_name): \([.assets[].download_count] | add) downloads"'

echo ""
echo "Note: This counts all asset downloads across all releases."
echo "Some assets may be downloaded multiple times by the same user."
