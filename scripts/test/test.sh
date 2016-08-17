#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR/../..
docker rm -f landingpage-test
docker run --name landingpage-test -i -e SAUCE_USERNAME=$SAUCE_USERNAME -e SAUCE_ACCESS_KEY=$SAUCE_ACCESS_KEY landingpage-build ./scripts/test/test-app.sh
