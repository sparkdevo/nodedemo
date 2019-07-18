FROM node:10.16

RUN mkdir /nodedemo
WORKDIR /nodedemo

COPY ./*.js ./
COPY ./*.json ./

RUN npm install

FROM node:10.16-slim
RUN mkdir /nodedemo
WORKDIR /nodedemo
COPY --from=0 /nodedemo .

EXPOSE 3000
ENTRYPOINT ["node", "index"]