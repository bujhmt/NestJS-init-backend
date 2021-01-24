#!/bin/bash
set -e

PATH_TO_CONFIG_FILE=".env";

# export values from your config file
export $(grep -v '^#' $PATH_TO_CONFIG_FILE | xargs -d '\n');

echo "###  Stop & remove old docker [$DOCKER_SERVER] and starting new fresh instance of [$DOCKER_SERVER]"
(docker kill $DOCKER_SERVER || :) && \
  (docker rm $DOCKER_SERVER || :) && \
  docker run --name $DOCKER_SERVER -e POSTGRES_PASSWORD=$POSTGRES_PASSWORD \
  -e PGPASSWORD=$POSTGRES_PASSWORD \
  -p $DOCKER_PORT:$DOCKER_PORT \
  -d $POSTGRES_USER

# wait for pg to start
echo "###  Sleep wait for pg-server [$DOCKER_SERVER] to start";
sleep 3;

# create the db
echo "CREATE DATABASE $POSTGRES_DATABASE ENCODING 'UTF-8';" | docker exec -i $DOCKER_SERVER psql -U postgres
echo "\l" | docker exec -i $DOCKER_SERVER psql -U postgres

# result output
echo '###  Container is running:'
docker ps

# Writing actual info about docker container
docker inspect $DOCKER_SERVER > current-docker-container.txt