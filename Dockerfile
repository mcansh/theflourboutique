FROM node:latest

WORKDIR /app

COPY yarn.lock package.json ./

RUN yarn install

COPY . .

CMD node -r @std/esm ./server.js
