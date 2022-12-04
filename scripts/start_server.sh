#!/bin/bash
source /home/ec2-user/.bash_profile
source /home/ec2-user/.bashrc

sudo chmod -R 777 /home/ec2-user/app/
cd /home/ec2-user/app/
npm run build
npm start:dev
sudo chmod -R 775 /home/ec2-user/app/