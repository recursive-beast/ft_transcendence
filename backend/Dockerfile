FROM node:18-alpine3.18
WORKDIR /app
COPY package*.json ./
RUN npm install -g @nestjs/cli && npm install
COPY src src/
COPY prisma prisma/
COPY *.json *.js .prettierrc ./
RUN npx prisma generate && nest build
CMD node dist/src/main.js
