# System Setup
* Install [Nodejs](https://nodejs.org/en/) LTS
* Install Grunt CLI: `sudo npm install -g grunt-cli`
* Install [MongoDB](https://www.mongodb.com/download-center#community).  Ensure mongo and mongod is available in the system PATH.
* Install [Vagrant](https://www.vagrantup.com/downloads.html)
* Install [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
* Install Vagrant VirtualBox Guest Additions `vagrant plugin install vagrant-vbguest`

# Code Setup
* Clone repository `git clone -b nodejs --single-branch git@github.com:Drethic/LAD.git ./lad`
* cd lad
* vagrant up
* Visit http://192.168.22.33:3000/ and http://192.168.22.33:3001/ to verify the api and app are working.