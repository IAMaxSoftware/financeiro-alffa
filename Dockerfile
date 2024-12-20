FROM node:18 as builder
WORKDIR /app

COPY package.json package-lock.json ./
COPY prisma ./prisma/
RUN npm ci
COPY . .
RUN apt-get update && apt-get install -y openssl
RUN npm run migrate:deploy
RUN npm run build

EXPOSE 80

ENTRYPOINT [ "npm", "run", "start" ]
