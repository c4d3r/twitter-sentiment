FROM node:7

ADD package.json /app/
RUN npm install

ADD . /app/

EXPOSE 3000
WORKDIR /app

CMD ["npm", "start"]
