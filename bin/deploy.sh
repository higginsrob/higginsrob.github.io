#!/usr/bin/env bash

set -e

npm run build;

git checkout master;

find . -maxdepth 1 \
    -not -name '.' \
    -not -name '.git' \
    -not -name '.gitignore' \
    -not -name 'build' \
    -not -name 'node_modules' \
    -print0 | xargs -0 rm -rf --;

cd build \
    && find . -maxdepth 1 \
        -not -name '.' \
        -not -name '.git' \
        -not -name '.gitignore' \
        -not -name 'build' \
        -not -name 'node_modules' \
        -print0 | xargs -I '{}' mv '{}' ../'{}' \
    && cd ../

git add . \
    && git commit --amend -m "Public Site build v$npm_package_version" \
    && git push --force origin master \
    && git checkout develop \
    && git reset --hard \
    && git clean -f

