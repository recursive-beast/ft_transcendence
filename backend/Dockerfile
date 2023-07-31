FROM node:18-alpine3.18
WORKDIR /app
RUN npm install -g @nestjs/cli
COPY package*.json ./
RUN npm install
COPY src src/
COPY prisma prisma/
COPY *.json *.js .prettierrc ./
EXPOSE 3000
VOLUME [ "/var/www/avatars" ]
CMD npx prisma migrate deploy && npx prisma generate && nest build && node dist/src/main.js
