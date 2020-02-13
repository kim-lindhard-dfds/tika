#!/bin/bash

declare -p | grep -Ev 'BASHOPTS|BASH_VERSINFO|EUID|PPID|SHELLOPTS|UID' > /container.env

echo "SHELL=/bin/bash" >> scheduler
echo "BASH_ENV=/container.env" >> scheduler
echo "*/30 * * * * /app/login.sh >> /var/log/cron.log 2>&1" >> scheduler
touch /var/log/cron.log
crontab scheduler
cron -f &
/app/login.sh

node main.js