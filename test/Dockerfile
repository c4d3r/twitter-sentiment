FROM node:7

ADD package.json /app/package.json
WORKDIR /app

RUN npm install

ADD . /app

EXPOSE [ 3000, 1337 ]


CMD ["npm", "run", "test"]