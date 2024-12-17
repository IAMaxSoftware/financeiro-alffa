FROM node:18-alpine as builder
WORKDIR /app

COPY package.json package-lock.json ./
COPY prisma ./prisma/
RUN npm ci
COPY . .
RUN npm run migrate:dev:create
RUN npm run build

EXPOSE 80

ENTRYPOINT [ "npm", "run", "start" ]
