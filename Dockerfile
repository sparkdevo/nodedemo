FROM node:8
COPY ./app.js ./app.js
COPY ./package.json ./package.json

WORKDIR ./
RUN npm install applicationinsights

EXPOSE 3000
ENTRYPOINT ["node", "app"]
