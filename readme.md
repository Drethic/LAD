# System Setup
* Install [Vagrant](https://www.vagrantup.com/downloads.html)
* Install [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
* Install Vagrant VirtualBox Guest Additions `vagrant plugin install vagrant-vbguest`

# Code Setup
* Clone repository `git clone -b nodejs --single-branch git@github.com:Drethic/LAD.git ./lad`
* cd lad
* vagrant up
* Visit http://192.168.22.33:3000/ and http://192.168.22.33:3000/api to verify the api and app are working.