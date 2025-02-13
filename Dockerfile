# Stage 1: Build React app
FROM node:16-alpine AS builder 
WORKDIR /app

# Copy dependency files 
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install 

# Copy the rest of the source code
COPY . .

# Build the React app for production 
RUN yarn build 

# Stage 2: Serve build with Nginx
FROM nginx:stable-alpine

# Remove default Nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy the build output from the builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]