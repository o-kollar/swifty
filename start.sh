#!/bin/bash

# Set environment variables
export APP_PORT=3000


# Build Docker image
docker build -t swifty .

# Run Docker container
docker run -p $APP_PORT:$APP_PORT  swifty
