#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR/../..
docker build -t gcr.io/qubeship/landingpage -f scripts/bake/Dockerfile .
