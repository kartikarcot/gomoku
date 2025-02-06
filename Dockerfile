# Build stage
FROM node:18-slim as build

# Set working directory
WORKDIR /app

# Copy package files from frontend-react directory
COPY frontend-react/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY frontend-react/ ./

# Build the React application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy the built app to nginx's serve directory
COPY --from=build /app/build /usr/share/nginx/html

# Create a custom nginx config
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]