#!/bin/sh

# TODO: use cmd line args for pre-release option

VERSION=$(cat package.json | jq -r '.version')
USER=$(cat package.json | jq -r '.author')
REPO=$(cat package.json | jq -r '.name')

# Release packaged application
yarn run build && \

zip -r build/upstream-linux-x64.zip build/upstream-linux-x64/
zip -r build/upstream-darwin-x64.zip build/upstream-darwin-x64/
zip -r build/upstream-win32-x64.zip build/upstream-win32-x64/

# Assumes https://github.com/aktau/github-release is installed on PATH
github-release release \
    --user ${USER} \
    --repo ${REPO} \
    --tag ${VERSION} \
    --name "${VERSION}" \
    --description "$1" \
    --pre-release

github-release upload \
    --user ${USER} \
    --repo ${REPO} \
    --tag ${VERSION} \
    --name "${REPO}-linux-x64.zip" \
    --file build/${REPO}-linux-x64.zip

github-release upload \
    --user ${USER} \
    --repo ${REPO} \
    --tag ${VERSION} \
    --name "${REPO}-darwin-x64.zip" \
    --file build/${REPO}-darwin-x64.zip

github-release upload \
    --user ${USER} \
    --repo ${REPO} \
    --tag ${VERSION} \
    --name "${REPO}-win32-x64.zip" \
    --file build/${REPO}-win32-x64.zip
