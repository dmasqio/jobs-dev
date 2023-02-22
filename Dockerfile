FROM node:10.3.0
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i
COPY . .
EXPOSE 8000
CMD [ "node", "server.js" ]
