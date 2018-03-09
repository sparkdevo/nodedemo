FROM node:8
COPY ./app.js ./app.js
COPY ./package.json ./package.json
EXPOSE 3000
ENTRYPOINT ["node", "app"]
