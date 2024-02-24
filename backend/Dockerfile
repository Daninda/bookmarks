FROM node:alpine

WORKDIR /usr/srv/app

COPY package.json .
COPY package-lock.json .

RUN npm install
COPY . .

CMD ["node", "index.js"]