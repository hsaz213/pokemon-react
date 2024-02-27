# Use an official Node runtime as a parent image
FROM node:14 as build

# Set the working directory in the container
WORKDIR /app

# Copy the client directory contents into the container at /app
COPY . /app

# Install any dependencies
RUN npm install

# Build for production.
RUN npm run build

# Use nginx to serve the React app
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
