#!/bin/bash

# Set image and container name
IMAGE_NAME="finpal-spa-dev"
CONTAINER_NAME="finpal-container"

# Set ports 
HOST_PORT=3000
CONTAINER_PORT=3000

# Check if container exists
container_id=$(docker ps -aq -f name=^/${CONTAINER_NAME}$)

if [ -n "$container_id" ]; then
  echo "Container '${CONTAINER_NAME}' already exists."
  
  # Check if the container is running
  running_container=$(docker ps -q -f name=^/${CONTAINER_NAME}$)
  if [ -n "$running_container" ]; then
    echo "Container '${CONTAINER_NAME}' is already running on port '${HOST_PORT}'."
  else
    echo "Starting container '${CONTAINER_NAME}'..."
    docker start ${CONTAINER_NAME}
  fi
else
  echo "No container named '${CONTAINER_NAME}' found. Building image and running container..."
  
  # Build the Docker image
  docker build -t ${IMAGE_NAME} .
  
  # Run the container with a bind mount for live reloading
  docker run --name ${CONTAINER_NAME} -p ${HOST_PORT}:${CONTAINER_PORT} -v "$(pwd)":/app ${IMAGE_NAME}
fi