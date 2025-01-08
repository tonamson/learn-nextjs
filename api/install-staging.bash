#!/bin/bash
# abort on errors
set -e

echo "================> Update new code"
git pull

echo "================> Install modules"
yarn install --ignore-engines

echo "================> Build folder website"
yarn build

echo "================> Chown permissions"
chown -R kanni:kanni /home/kanni/web

echo "================> Delete pm2"
pm2 delete ecosystem-staging.config.js

echo "================> Start pm2"
pm2 start ecosystem-staging.config.js