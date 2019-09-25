#!/bin/bash
git config --global push.default matching
git remote add deploy ssh://git@$IP:$PORT$DEPLOY_DIR
git push deploy master

ssh apps@$IP -p $PORT <<EOF
    cd $DEPLOY_DIR
    yarn build
EOF
