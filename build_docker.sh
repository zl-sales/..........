#!/bin/bash
basepath=$(cd `dirname $0`; pwd)
docker build -t fengniao-cms-frontend .
echo $basepath
docker run --rm -v $basepath:/src fengniao-cms-frontend