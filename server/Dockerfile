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
    curl expect nodejs-current \
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


# Add appuser user
RUN    addgroup -g 1001 -S appuser \
    && adduser -u 1001 -S appuser -G appuser \ 
    && chown -R appuser:appuser /app

USER appuser
ENTRYPOINT /app/entrypoint.sh