
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
COPY .env.example .

# Make our shell script executable
RUN chmod +x env.sh

# Start Nginx server
CMD ["/bin/sh", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]

#------
# FROM node:alpine as build

# WORKDIR /pokedex-web

# COPY . /pokedex-web

# ENV PATH /pokedex-web/node_modules/.bin:$PATH

# ARG REACT_APP_POKE_API_URL
# ARG REACT_APP_POKEDEX_API_URL
# ARG REACT_APP_POKEMON_IMAGES_GIF
# ARG REACT_APP_POKEMON_IMAGES
# ARG REACT_APP_POKEMON_SHINY_IMAGES
# ARG REACT_APP_MAX_NUMBER_POKEMONS
# ARG REACT_APP_MAX_NUMBER_GENERATE_POKEMONS

# ENV REACT_APP_POKE_API_URL=$REACT_APP_POKE_API_URL
# ENV REACT_APP_POKEDEX_API_URL=$REACT_APP_POKEDEX_API_URL
# ENV REACT_APP_POKEMON_IMAGES_GIF=$REACT_APP_POKEMON_IMAGES_GIF
# ENV REACT_APP_POKEMON_IMAGES=$REACT_APP_POKEMON_IMAGES
# ENV REACT_APP_POKEMON_SHINY_IMAGES=$REACT_APP_POKEMON_SHINY_IMAGES
# ENV REACT_APP_MAX_NUMBER_POKEMONS=$REACT_APP_MAX_NUMBER_POKEMONS
# ENV REACT_APP_MAX_NUMBER_GENERATE_POKEMONS=$REACT_APP_MAX_NUMBER_GENERATE_POKEMONS

# RUN yarn

# RUN yarn build

# FROM nginx:alpine

# COPY --from=build /pokedex-web/build /usr/share/nginx/html

# RUN rm /etc/nginx/conf.d/default.conf

# COPY nginx/nginx.conf /etc/nginx/conf.d

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]

#--------