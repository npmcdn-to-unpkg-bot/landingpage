#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR/../..
docker build -t landingpage-build -f scripts/build/Dockerfile .
filename=`docker run landingpage-build ls target`
docker run landingpage-build cat target/$filename | tee target/$filename > /dev/null
