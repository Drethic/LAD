#!/usr/bin/env bash

# Environment Variables
PROJECTFOLDER='lad'

# update / upgrade the system
sudo apt-get -y update
sudo apt-get -y upgrade

# Install nodejs LTS
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB 3.2
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
echo "deb http://repo.mongodb.org/apt/debian wheezy/mongodb-org/3.2 main" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
sudo apt-get -y update
sudo apt-get install -y mongodb-org

# Install Grunt CLI
sudo npm install -g grunt-cli

# Install pm2
sudo npm install -g pm2

# Install git so grunt command will work
sudo apt-get install -y git

# Do initial Grunt of the project
su -c "cd /opt/${PROJECTFOLDER} && npm install" vagrant