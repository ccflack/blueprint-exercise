# Sepcify the base image
FROM node:22-alpine

# Recommended labels
LABEL Name=blueprint-exercise Version=0.0.1

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the files
COPY . .

# Build the app
RUN npm run build

# Run the app
CMD ["npm", "run", "start:dev"]

# Expose the port
EXPOSE 4000
