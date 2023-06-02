FROM node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
COPY dockerenv  .env

RUN npx prisma migrate deploy
RUN npx prisma generate
RUN npx prisma db seed

EXPOSE 8080
CMD [ "node", "index.js" ]