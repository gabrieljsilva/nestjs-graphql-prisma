#!/bin/bash
/bin/bash ./load_nvm.sh

cd /home/ec2-user/app/
npm run build
npm start:dev