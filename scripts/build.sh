#!/bin/bash

npm install

apt-get install libgdbm-dev libncurses5-dev automake libtool bison libffi-dev
gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
curl -sSL https://get.rvm.io | bash -s stable
source /usr/local/rvm/scripts/rvm 
rvm install 2.3.1
rvm use 2.3.1 --default

gem install compass
./node_modules/.bin/grunt prod
