#!/bin/sh

# TODO: use cmd line args for pre-release option

VERSION=$(cat package.json | jq -r '.version')
USER=$(cat package.json | jq -r '.author')
REPO=$(cat package.json | jq -r '.name')
PRODUCT_NAME=$(cat package.json | jq -r '.build.productName')

# Release packaged application
yarn run build

# Assumes https://github.com/aktau/github-release is installed on PATH
echo "Pushing release ${VERSION}"
github-release release \
    --user ${USER} \
    --repo ${REPO} \
    --tag ${VERSION} \
    --name "${VERSION}" \
    --description "$1" \
    --pre-release

echo "Uploading linux AppImage..."
github-release upload \
    --user ${USER} \
    --repo ${REPO} \
    --tag ${VERSION} \
    --name "${REPO}-${VERSION}-x86_64.AppImage" \
    --file build/${REPO}-${VERSION}-x86_64.AppImage
echo "Linux AppImage upload complete!"

echo "Uploading windows installer..."
github-release upload \
    --user ${USER} \
    --repo ${REPO} \
    --tag ${VERSION} \
    --name "${PRODUCT_NAME} Win Setup ${VERSION}.exe" \
    --file build/${PRODUCT_NAME}\ Setup\ ${VERSION}.exe
echo "Windows installer upload complete!"
