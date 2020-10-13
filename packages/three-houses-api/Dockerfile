FROM node:12-alpine as node-server

# Node server
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install server dependencies
COPY ./package*.json ./
RUN npm install --production

COPY ./dist/index.js ./dist/

RUN ls -la

# Start the server
EXPOSE 7000

# command to run when intantiate an image
CMD ["npm","start"]