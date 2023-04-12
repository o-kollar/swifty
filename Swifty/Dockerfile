# Use an official Node.js runtime as a parent image
FROM node:latest

# Install Java
RUN apt-get update && apt-get install -y openjdk-17-jre-headless

# Set the working directory to /app
WORKDIR /app


# Copy the current directory contents into the container at /app
COPY . /app

# Install app dependencies
RUN npm install
RUN npm install node-fetch@2.6.5
RUN npm install dotenv 
RUN npm install @mapbox/polyline
RUN npm install alpinejs
RUN npm install esbuild
RUN npm install -D tailwindcss
RUN npm install flowbite


# Set the environment variable to the default OTP port
ENV OTP_PORT 8080

# Expose the OTP port
EXPOSE 3000

# Start the Express server and OTP
CMD ["npm", "start"]
