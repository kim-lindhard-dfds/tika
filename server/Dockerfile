## Node js app builder ##
FROM node:12.13.1-alpine3.9 AS Builder

WORKDIR /app

COPY package.json .
RUN npm install 

COPY webpack.config.js .
COPY tsconfig.json .
COPY ./src/ ./src/

RUN npm run build


## Runner
FROM openjdk:jre-alpine AS Runner

# Install curl, expect & nodejs
RUN apk add --update \
    curl expect nodejs-current\
    && rm -rf /var/cache/apk/*


WORKDIR /ccloud

# download ccloud cli tool
RUN curl -L https://s3-us-west-2.amazonaws.com/confluent.cloud/ccloud-cli/install.sh | sh -s -- -b /ccloud/bin

ENV TIKA_CCLOUD_BIN_PATH="/ccloud/bin/ccloud"
ENV PATH "$PATH:/ccloud/bin"

RUN ccloud version

# Install bash
RUN apk add --no-cache --upgrade bash

WORKDIR /app

COPY --from=Builder /app/dist/main.js .

COPY ./login.sh /app/login.sh
COPY ./entrypoint.sh /app/entrypoint.sh

# Run the cron every minut

#RUN echo '*  *  *  *  *    /app/login.sh' >> /var/log/cron.log 2>&1
#CMD ["crond", "-l 2", "-f"]



# Run as non-root
RUN addgroup -g 1001 -S appuser && adduser -u 1001 -S appuser -G appuser
RUN chown -R appuser:appuser /app



# FOR DEBUGGING DELETE
RUN apk add --update busybox-suid
#RUN mkdir /var/spool/cron/crontabs 
#RUN chown -R appuser:appuser /var/spool/cron/crontabs/appuser

RUN chown appuser /var/spool/cron/crontabs
#RUN echo '* * * * * echo hello' | crontab - && crond -f -L /dev/stdout
#RUN echo '* * * * * echo hello' | crontab - && crond -f -L /dev/stdout

#CMD ["cron", "-f"]
#RUN echo '* * * * * echo hello' >> /etc/crontabs/root
##RUN echo '* * * * * appuser echo hello' >> /etc/crontab

#RUN 1 1 * * * username /path/to/your/script.sh
#CMD ["crond", "-f", "-d", "8"]
#CMD /etc/init.d/crond start
# CMD ['sh', '-c', 'crond && gulp']
#/etc/init.d/crond start

RUN touch /var/log/cron.log
#RUN crond start


## DEAD# 
#RUN echo '* * * * * runuser appuser --command="echo hello"' >> /etc/crontabs/root
#RUN echo '* * * * * echo hello <<' >> crontab -u appuser -e
#RUN echo '* * * * * appuser echo hello' >> crontab
#RUN chmod 2755 /usr/bin/crontab

#RUN echo '* * * * * appuser echo hello >> /home/appuser/thefile' >> /etc/crontab
#RUN echo '* * * * * echo hello >> /home/appuser/thefile' >> /etc/crontabs/root

#RUN crond start


RUN echo -e '* * * * * echo hello' >> /var/spool/cron/crontabs/root


COPY ./cron-start.sh /app/cron-start.sh
COPY ./docker-cmd.sh /app/docker-cmd.sh

USER appuser
ENTRYPOINT /app/entrypoint.sh
#CMD ["/docker-cmd.sh"]
USER root
CMD crond -b -L /var/log/cron.log "$@"
#CMD ["/usr/sbin/crond", "-f"]

