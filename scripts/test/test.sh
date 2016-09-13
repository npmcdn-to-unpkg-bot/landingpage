#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR/../..
docker rm -f landingpage-test-client
docker run --name landingpage-test-client -i -e SELENIUM_USERNAME=$SELENIUM_USERNAME -e SELENIUM_ACCESS_KEY=$SELENIUM_ACCESS_KEY landingpage-build ./scripts/test/test-app.sh
