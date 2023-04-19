# Use the official Node.js LTS (Long-Term Support) image as the base image
FROM node:lts

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files into the container
COPY package*.json ./

# Install the dependencies
RUN npm ci

# Copy the rest of the application files into the container
COPY . .

# Build the TypeScript project
RUN npm run build

# Expose the port on which the application will run
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
