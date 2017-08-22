#!/usr/bin/env bash

# Environment Variables
PROJECTFOLDER='lad'

# update / upgrade the system
# sudo apt-get -y update
# sudo apt-get -y upgrade

# Install nodejs LTS
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB 3.4
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
sudo apt-get -y update
sudo apt-get install -y mongodb-org
sudo service mongod start

# Install Grunt CLI
sudo npm install -g grunt-cli

# Install pm2
sudo npm install -g pm2

# Install git so grunt command will work
sudo apt-get install -y git

# Do initial Grunt of the project
su -c "cd /opt/${PROJECTFOLDER} && npm install && node db/seeds/dev.js && npm run pm2-start" vagrant