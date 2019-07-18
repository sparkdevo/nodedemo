FROM node:10.16

RUN mkdir /nodedemo
WORKDIR /nodedemo

COPY ./*.js ./
COPY ./*.json ./

RUN npm install

EXPOSE 3000
ENTRYPOINT ["node", "index"]