#!/bin/ash

/app/login.sh

# Add /app/login.sh to cron every 30 min & calls the cron demon (vent thou it is started by root) & outputs the cron log file in current users console
echo '*/30 * * * * /app/login.sh' >> /etc/crontabs/appuser 
crond -b -L /var/log/cron.log "$@" 
tail -f /var/log/cron.log &

node /app/main.js