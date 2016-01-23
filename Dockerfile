FROM node:4.2.1

WORKDIR /

COPY . /feedit_server

WORKDIR /feedit_server

RUN npm install

EXPOSE 8080

CMD ["./node_modules/.bin/pm2", "start deploy.json"]
