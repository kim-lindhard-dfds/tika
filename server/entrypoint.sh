#!/bin/bash

chmod +x /app/login.sh
#/app/login.sh

#crond -f 
#echo '* * * * * echo hello' | crontab - && crond -f -L /dev/stdout

#echo "SHELL=/bin/bash" >> scheduler
#echo "BASH_ENV=/container.env" >> scheduler
#echo "*/30 * * * * /app/login.sh >> /var/log/cron.log 2>&1" >> scheduler
#touch /var/log/cron.log
#crontab scheduler
#cron -f &

#(cd /etc/init.d/ && crond status)



tail -f /var/log/cron.log &

#/app/cron-start.sh
node main.js