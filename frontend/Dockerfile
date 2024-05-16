# Use the official Node.js image as a base image
FROM node:latest

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application and output to the dist directory
RUN npm run build

# Install serve globally
RUN npm install -g serve

# Start the application
CMD ["serve", "-s", "dist"]

# Expose the port the app runs on
EXPOSE 8080
