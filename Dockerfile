FROM node:12.13.1-alpine3.9 AS Builder

WORKDIR /app

COPY package.json .
RUN npm install 

COPY webpack.config.js .
COPY tsconfig.json .
COPY ./src/ ./src/

RUN npm run build

## Runner
FROM openjdk:jre-slim AS Runner

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

COPY --from=Builder /app/dist/main.js .

COPY ./ccloud-config /root/.ccloud/config

ENTRYPOINT [ "node", "main" ]