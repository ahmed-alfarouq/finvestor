FROM node:18-alpine AS base

WORKDIR /src

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "node", "src/index.js" ]