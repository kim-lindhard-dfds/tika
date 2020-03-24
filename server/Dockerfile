# https://github.com/nodejs/docker-node/blob/6bc7fe5d018f2235cdcd2f7681990cee9d096497/13/alpine3.11/Dockerfile
## Node js app builder ##
FROM node:13.10.1-alpine3.11 AS Builder

WORKDIR /app

COPY package.json .
RUN npm install 

COPY webpack.config.js .
COPY tsconfig.json .
COPY ./src/ ./src/

RUN npm run build


## Node js app runner ##
FROM node:13.10.1-alpine3.11 As Runner 

# Install curl & expect
RUN apk add --update \
    curl expect \
    && rm -rf /var/cache/apk/*

# Install ccloud cli tool
RUN curl -L https://s3-us-west-2.amazonaws.com/confluent.cloud/ccloud-cli/install.sh | sh -s -- -b /ccloud/bin

ENV TIKA_CCLOUD_BIN_PATH="/ccloud/bin/ccloud"
ENV PATH "$PATH:/ccloud/bin"

RUN ccloud version


# Copy app & supporting scripts
COPY --from=Builder /app/dist/main.js /app/main.js
COPY ./login.sh /app/login.sh
COPY ./entrypoint.sh /app/entrypoint.sh


# user:1000 group: 1000
USER node


ENTRYPOINT /app/entrypoint.sh