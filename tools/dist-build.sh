#!/bin/bash -x

#
# 此脚本构建可以发布的打包文件
#

# 清理已有的打包目录
rm dist -rf && mkdir -p dist

# 删除client目录下的构建目录.next
rm client/.next -rf

# 创建目录
mkdir -p dist/client dist/server

# 构建client
npx next build client

# 构建server
npx webpack

# 整理dist目录
cp -r client/.next dist/client/
rm -rf client/.next
cp -r client/static dist/client/

# db migration
mkdir -p dist/server/database
cp server/database/knexfile.js dist/server/database/
cp -r server/database/migrations dist/server/database/

# package.json
cp package.json dist/
cp package-lock.json dist/

# bin
cp -r tools/bin dist/

# 测试环境简单验证
# cd dist
# npm install --production --registry=http://mirrors.cloud.tencent.com/npm/ --unsafe-perm=true --allow-root
# npm run migrate:latest
# mkdir -p /data/remark
# ln -s ../config.yml && sh ./bin/start.sh

# 打包
cd dist
VERSION=`grep version package.json | cut -f4 -d'"'`
tar --exclude=node_modules \
    --exclude=config.yml \
    --exclude=server/database/db.sqlite3 \
    -Jcvf ../install/remark-${VERSION}.dist.tar.xz .
cd -

# TODO 未来可以按照版本号更智能地执行用户端更新
cp install/remark-${VERSION}.dist.tar.xz install/remark-latest.tar.xz
