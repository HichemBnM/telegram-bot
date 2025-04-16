# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files into the container
COPY package*.json ./

# Install the application dependencies
RUN npm install && \
    npm install express@4 && \
    npm i axios
 

# Copy the rest of your project files into the container
COPY . .

# Expose the port the app will run on
EXPOSE 3000

# Command to run your application
CMD ["node", "index.js"]