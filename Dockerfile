# ------2

# => Build container
FROM node:alpine as builder
WORKDIR /pokekdex-web
COPY package.json .
RUN yarn
COPY . .
RUN yarn build

# => Run container
FROM nginx:alpine

# Nginx config
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

# Static build
COPY --from=builder /pokekdex-web/build /usr/share/nginx/html/

# Default port exposure
EXPOSE 80

# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html
COPY ./env.sh .
COPY .env .

# Make our shell script executable
RUN chmod +x env.sh

# Start Nginx server
CMD ["/bin/sh", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
