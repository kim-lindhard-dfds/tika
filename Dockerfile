FROM node:12.13.1-alpine3.9 AS Builder

WORKDIR /app

COPY package.json .
RUN npm install 

COPY webpack.config.js .
COPY tsconfig.json .
COPY ./src/server ./src/

RUN npm run build

## Runner
FROM openjdk:jre-slim AS Runner

RUN apt-get update && apt-get -y upgrade
RUN apt-get -y install curl expect cron

WORKDIR /ccloud

# download ccloud cli tool
RUN curl -L https://cnfl.io/ccloud-cli | sh -s -- -b /ccloud/bin

ENV TIKA_CCLOUD_BIN_PATH="/ccloud/bin/ccloud"
ENV PATH "$PATH:/ccloud/bin"

# install nodejs
RUN apt-get install -y gnupg
RUN curl -sL https://deb.nodesource.com/setup_11.x | bash -
RUN apt-get install -y nodejs


WORKDIR /app

COPY --from=Builder /app/dist/main.js .

COPY ./ccloud-config /root/.ccloud/config
COPY ./login.sh /app/login.sh
COPY ./entrypoint.sh /app/entrypoint.sh

ENTRYPOINT /app/entrypoint.sh