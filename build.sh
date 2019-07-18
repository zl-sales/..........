#!/bin/bash

# npm install vue-video-player
#yarn config set registry http://registry.npm.taobao.org/
yarn
# npm install chromedriver --chromedriver_cdnurl=http://cdn.npm.taobao.org/dist/chromedriver
# yarn NODEJS_ORG_MIRROR=http://npm.taobao.org/mirrors/node npm i --registry=https://registry.npm.taobao.org
# PHANTOMJS_CDNURL=https://npm.taobao.org/dist/phantomjs npm install phantomjs --registry=https://registry.npm.taobao.org --no-proxy
# NODEJS_ORG_MIRROR=http://npm.taobao.org/mirrors/node npm i node-sass --registry=https://registry.npm.taobao.org
#cnpm i

npm run build
#npm install node-sass
#rm -rf node_modules
cp -rf dist production

#npm run dev
#cd production
#docker build -t goodrain.me/fengniao-web-frontend .
#docker goodrain.me/fengniao-web-frontend