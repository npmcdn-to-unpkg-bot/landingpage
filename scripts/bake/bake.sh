#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR/../..
filename=`docker run landingpage-build ls target`
docker run landingpage-build cat target/$filename | tee target/$filename > /dev/null
docker build -t gcr.io/qubeship/landingpage -f scripts/bake/Dockerfile .
