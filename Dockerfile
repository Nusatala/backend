FROM node

WORKDIR /usr/src/app

ARG DATABASE_URL
ARG SECRET_KEY

COPY package*.json ./

RUN npm install

COPY . .

RUN echo 'DATABASE_URL='$DATABASE_URL >> .env
RUN echo 'SECRET_KEY='$SECRET_KEY >> .env

RUN npx prisma migrate deploy
RUN npx prisma generate

EXPOSE 8080
CMD [ "npm", "start" ]