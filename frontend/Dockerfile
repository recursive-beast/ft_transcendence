FROM node:18-alpine3.18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY jsconfig.json ./jsconfig.json
COPY next.config.js ./next.config.js
COPY postcss.config.js ./postcss.config.js
COPY public ./public
COPY src ./src
COPY tsconfig.json ./tsconfig.json
COPY prettier.config.js ./prettier.config.js
COPY tailwind.config.js ./tailwind.config.js
CMD npm run build && npm run prod
