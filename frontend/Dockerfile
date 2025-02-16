FROM node:16-alpine
WORKDIR /app

# Copy dependency files first
COPY package.json yarn.lock ./
RUN yarn install 

# Copy the rest of the source code
COPY . .

# Expose server to port 3000
EXPOSE 3000

# Start dev server
CMD ["yarn", "start"]