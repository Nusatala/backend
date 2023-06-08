FROM node

WORKDIR /usr/src/app

ARG DATABASE_URL

COPY package*.json ./

RUN npm install

COPY . .

RUN echo 'DATABASE_URL="'$DATABASE_URL'"' >> .env

RUN npx prisma migrate deploy
RUN npx prisma generate

EXPOSE 8080
CMD [ "npm", "start" ]