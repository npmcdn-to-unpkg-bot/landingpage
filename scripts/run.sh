#!/bin/bash
docker rm -f landingpage-v1
docker run -d --name landingpage-v1 -p 443:443 landingpage  
