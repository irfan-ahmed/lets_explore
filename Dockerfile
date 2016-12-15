# Copyright 2016, Irfan Ahmed. All Rights Reserved.

FROM node:6.0
EXPOSE 8080
COPY . /app/
WORKDIR /app
CMD node server.js
