# Stage 1: Build the React app
FROM node:18 AS build

WORKDIR /app

# Install dependencies and build the app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build  # This generates the /build directory

# Stage 2: Serve the app using serve (a static file server)
FROM node:18-slim

# Install serve globally to serve static files
RUN npm install -g serve

WORKDIR /

# Copy the build directory from the build stage
COPY --from=dist /dist /dist

# Expose the port that the app will run on
EXPOSE 3000

# Start the app using serve
CMD ["serve", "-s", "dist", "-l", "3000"]
