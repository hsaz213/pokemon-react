# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the current directory contents into the container at /usr/src/app
COPY . /usr/src/app

# Install any needed packages specified in package.json
RUN npm install

# Make port 3001 available to the world outside this container
EXPOSE 3001

# Define environment variable
ENV NODE_ENV=production

# Run app when the container launches
CMD ["npm", "start"]
