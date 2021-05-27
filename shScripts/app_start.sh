#!/bin/bash
cd /home/ec2-user/nodetest/api
pm2 start npm --name "cloudDIY_Photo_API" -- start
pm2 startup
pm2 save
pm2 restart all