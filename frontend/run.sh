#!/bin/bash

IMAGE_NAME="finpal-spa-dev"
CONTAINER_NAME="finpal-container"
HOST_PORT=3000
CONTAINER_PORT=3000

# check if docker engine running
check_docker() {
  if ! docker info >/dev/null 2>&1; then
    echo "Docker is not running! Please start Docker and try again."
    exit 1
  fi
}

# check if container exists
container_exists() {
  [ -n "$(docker ps -aq -f name=^/${CONTAINER_NAME}$)" ]
}

# check if container is running
container_running() {
  [ -n "$(docker ps -q -f name=^/${CONTAINER_NAME}$)" ]
}

check_docker

if container_exists; then
  echo -e "\nContainer '${CONTAINER_NAME}' exists."
  
  if container_running; then
    echo "Container '${CONTAINER_NAME}' is already running on port ${HOST_PORT}."
  else
    echo "Starting existing container '${CONTAINER_NAME}'..."
    docker start ${CONTAINER_NAME} > /dev/null 2>&1
  fi
else
  echo "🚧 No container named '${CONTAINER_NAME}' found. Building and running..."
  
  # build image
  docker build -t ${IMAGE_NAME} .
  
  # run container with bind mount
  docker run --name ${CONTAINER_NAME} -p ${HOST_PORT}:${CONTAINER_PORT} -v "$(pwd)":/app ${IMAGE_NAME}
fi

# get current time
CURRENT_TIME=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

echo -e "Following logs for container '${CONTAINER_NAME}'...\n"

# follow logs since current time
docker logs -f --since "$CURRENT_TIME" ${CONTAINER_NAME} & LOGS_PID=$!

# stop container on exit (ex: ctrl+c)
trap "echo -e '\n🛑 Stopping container ${CONTAINER_NAME}...'; docker stop ${CONTAINER_NAME} > /dev/null 2>&1; kill ${LOGS_PID} 2>/dev/null; exit 0" SIGINT
wait ${LOGS_PID}