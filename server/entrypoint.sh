#!/bin/bash

#chmod +x /app/login.sh


crond -b -L /var/log/cron.log "$@" && tail -f /var/log/cron.log & #


node main.js