# Project for "GraphQL Full Course - Novice to Expert"

Completed source for example project at:
https://github.com/iamshaunjp/graphql-playlist
https://www.youtube.com/watch?v=ed8SzALpx1Q

## Prerequisites

* Nodemon (`npm i -g nodemon`)
* Docker
* NodeJS

## Run server

Add some authors to the list in `init-mongo.js`, then run the server:

```
cd server
npm i
docker-compose up -d
nodemon app
```

## Run client

```
cd client
npm i
npm start
```