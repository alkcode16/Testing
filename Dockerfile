# FROM node:19.5.0-alpine3.17 AS builder

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm install

# COPY . .

# RUN npm run build

# FROM nginx:1.19-alpine

# RUN rm -rf /usr/share/nginx/html/*
# #RUN rm -rf /var/www/html/*


# COPY --from=builder /usr/src/app/dist/testing /usr/share/nginx/html
# #COPY --from=builder /usr/src/app/dist/testing /var/www/html


# COPY nginx.conf /etc/nginx/nginx.conf


#EXPOSE 80
#EXPOSE 443
#--------------------------------------------------------------------------------------

FROM node:latest  as node

WORKDIR /app

COPY ./ /app

RUN npm install
ARG configuration=production
RUN npm run build --configuration=$configuration

#Servidor nginx

FROM nginx:alpine

COPY --from=node /app/dist/testing /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

#-----------------------------------------------------------------------------------------

# FROM node:18 AS build

# WORKDIR /app

# COPY package*.json .
# RUN npm install

# COPY . .
# RUN npm run build

# # ----------------------------
# # run with nginx
# # ----------------------------
# FROM nginx

# RUN rm /etc/nginx/conf.d/default.conf
# COPY nginx.conf /etc/nginx/conf.d
# COPY --from=build /app/dist/testing /usr/share/nginx/html

# EXPOSE 80


#docker build -t reporteador-angular-test --build-arg configuration="staging" .