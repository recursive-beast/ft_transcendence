FROM node:18-alpine3.18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY nest-cli.json ./nest-cli.json
COPY prisma ./prisma
COPY src ./src
COPY tsconfig.build.json ./tsconfig.build.json
COPY tsconfig.json ./tsconfig.json
CMD npx prisma generate && npx prisma migrate deploy && npm run start
