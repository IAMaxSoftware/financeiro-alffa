FROM node:18-alpine as builder
WORKDIR /app

COPY package.json package-lock.json ./
COPY prisma ./prisma/
RUN npm ci
COPY . .
RUN apt-get install openssl
RUN npm run migrate:deploy
RUN npm run build

EXPOSE 80

ENTRYPOINT [ "npm", "run", "start" ]
