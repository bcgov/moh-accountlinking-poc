# STEP-1 BUILD
# Defining node image and giving alias as build
# It's better to define version otherwise me might face issue in future build
FROM node:21-alpine as build

#Creating virtual directory inside docker image
WORKDIR /app

RUN npm cache clean --force

#Copying file from local machine to virtual docker image directory
COPY . .

#installing deps for project
RUN npm install

#creating angular build
RUN npm run build --prod

#STEP-2 RUN
#Defining nginx img
FROM nginx:alpine3.18-slim

#copying compiled code from dist to nginx folder for serving
COPY --from=build /app/dist/linking-frontend /usr/share/nginx/html

#copying nginx config from local to image
COPY /nginx.conf /etc/nginx/conf.d/default.conf

#exposing internal port
EXPOSE 80
