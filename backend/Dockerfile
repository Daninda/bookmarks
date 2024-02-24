FROM node:20-alpine
WORKDIR /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install --only=prod
COPY . /app
EXPOSE 3000
CMD ["node", "index.js"]