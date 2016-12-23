FROM node:7

ADD ./application/package.json /app/
RUN npm install

ADD ./application /app/

EXPOSE 3000
WORKDIR /app

CMD ["npm", "start"]
