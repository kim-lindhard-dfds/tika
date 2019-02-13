FROM openjdk:jre-slim

RUN apt-get update && apt-get -y upgrade
RUN apt-get -y install curl

WORKDIR /ccloud

# download ccloud cli tool
RUN curl -o /tmp/tools.tar.gz https://s3-us-west-2.amazonaws.com/confluent.cloud/cli/ccloud-0.2.1.tar.gz
RUN tar -xv -f /tmp/tools.tar.gz -C /ccloud

ENV CCLOUDCLI="/ccloud/ccloud-0.2.1/bin/ccloud"

# install nodejs
RUN apt-get install -y gnupg
RUN curl -sL https://deb.nodesource.com/setup_11.x | bash -
RUN apt-get install -y nodejs

# WORKDIR /ccloud/ccloud-0.2.1/bin

WORKDIR /app

COPY src/package.json .
RUN npm install

COPY src/index.js .

COPY ./ccloud-config /root/.ccloud/config

ENTRYPOINT [ "npm", "start" ]