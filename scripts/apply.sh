#!/bin/sh
CLUSTER_ID=$1
SERVICE_ACCOUNT_ID=$2
TOPIC_PREFIX=$3
NOT_DRY_RUN=$4

if [ "$NOT_DRY_RUN" = "true" ]; then
    echo "DOING IT LIVE"
    ccloud kafka acl create --cluster $CLUSTER_ID --allow --service-account $SERVICE_ACCOUNT_ID --operation WRITE --topic $TOPIC_PREFIX --prefix
    ccloud kafka acl create --cluster $CLUSTER_ID --allow --service-account $SERVICE_ACCOUNT_ID --operation READ --topic $TOPIC_PREFIX --prefix
    ccloud kafka acl create --cluster $CLUSTER_ID --allow --service-account $SERVICE_ACCOUNT_ID --operation CREATE --topic $TOPIC_PREFIX --prefix
    ccloud kafka acl create --cluster $CLUSTER_ID --allow --service-account $SERVICE_ACCOUNT_ID --operation DESCRIBE --topic $TOPIC_PREFIX --prefix
    ccloud kafka acl create --cluster $CLUSTER_ID --allow --service-account $SERVICE_ACCOUNT_ID --operation DESCRIBE-CONFIGS --topic $TOPIC_PREFIX --prefix

    ccloud kafka acl create --cluster $CLUSTER_ID --allow --service-account $SERVICE_ACCOUNT_ID --operation WRITE --consumer-group $TOPIC_PREFIX --prefix
    ccloud kafka acl create --cluster $CLUSTER_ID --allow --service-account $SERVICE_ACCOUNT_ID --operation CREATE --consumer-group $TOPIC_PREFIX --prefix
    ccloud kafka acl create --cluster $CLUSTER_ID --allow --service-account $SERVICE_ACCOUNT_ID --operation READ --consumer-group $TOPIC_PREFIX --prefix

    ccloud kafka acl create --cluster $CLUSTER_ID --deny --service-account $SERVICE_ACCOUNT_ID --operation alter --cluster-scope
    ccloud kafka acl create --cluster $CLUSTER_ID --deny --service-account $SERVICE_ACCOUNT_ID --operation alter-configs --cluster-scope
    ccloud kafka acl create --cluster $CLUSTER_ID --deny --service-account $SERVICE_ACCOUNT_ID --operation cluster-action --cluster-scope
    ccloud kafka acl create --cluster $CLUSTER_ID --deny --service-account $SERVICE_ACCOUNT_ID --operation create --topic '*' --prefix
else
    echo "SERVICE_ACCOUNT_ID=$SERVICE_ACCOUNT_ID"
    echo "TOPIC_PREFIX=$TOPIC_PREFIX"

    echo "\nThe following commands will be run if 'true' is appended:\n"

    echo "ccloud kafka acl create --cluster $CLUSTER_ID --allow --service-account $SERVICE_ACCOUNT_ID --operation WRITE --topic $TOPIC_PREFIX --prefix"
    echo "ccloud kafka acl create --cluster $CLUSTER_ID --allow --service-account $SERVICE_ACCOUNT_ID --operation READ --topic $TOPIC_PREFIX --prefix"
    echo "ccloud kafka acl create --cluster $CLUSTER_ID --allow --service-account $SERVICE_ACCOUNT_ID --operation CREATE --topic $TOPIC_PREFIX --prefix"
    echo "ccloud kafka acl create --cluster $CLUSTER_ID --allow --service-account $SERVICE_ACCOUNT_ID --operation DESCRIBE --topic $TOPIC_PREFIX --prefix"
    echo "ccloud kafka acl create --cluster $CLUSTER_ID --allow --service-account $SERVICE_ACCOUNT_ID --operation DESCRIBE-CONFIGS --topic $TOPIC_PREFIX --prefix"

    echo "ccloud kafka acl create --cluster $CLUSTER_ID --allow --service-account $SERVICE_ACCOUNT_ID --operation WRITE --consumer-group $TOPIC_PREFIX --prefix"
    echo "ccloud kafka acl create --cluster $CLUSTER_ID --allow --service-account $SERVICE_ACCOUNT_ID --operation CREATE --consumer-group $TOPIC_PREFIX --prefix"
    echo "ccloud kafka acl create --cluster $CLUSTER_ID --allow --service-account $SERVICE_ACCOUNT_ID --operation READ --consumer-group $TOPIC_PREFIX --prefix"

    echo "ccloud kafka acl create --cluster $CLUSTER_ID --deny --service-account $SERVICE_ACCOUNT_ID --operation alter --cluster-scope"
    echo "ccloud kafka acl create --cluster $CLUSTER_ID --deny --service-account $SERVICE_ACCOUNT_ID --operation alter-configs --cluster-scope"
    echo "ccloud kafka acl create --cluster $CLUSTER_ID --deny --service-account $SERVICE_ACCOUNT_ID --operation cluster-action --cluster-scope"
    echo "ccloud kafka acl create --cluster $CLUSTER_ID --deny --service-account $SERVICE_ACCOUNT_ID --operation create --topic '*' --prefix"

fi
