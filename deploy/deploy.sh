#!/bin/bash
git config --global push.default matching
git remote add deploy ssh://qwnu-frontend@$IP:$PORT$DEPLOY_DIR
git push deploy master

ssh -n qwnu-frontend@$IP -p $PORT <<EOF
    cd $DEPLOY_DIR
    yarn install
    yarn build
EOF
