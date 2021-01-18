const express = require('express');
const http = require('http');
const { typeDefs, resolvers } = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const { ApolloServer, gql } = require('apollo-server-express');

const PORT = 4000;
const app = express();

app.use(cors());

mongoose.connect('mongodb://test:qwe123@localhost:27017/readinglist', {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.once('open', () => {
    console.log('connected to database');
});

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

// app.listen(4000, () => {
//     console.log("listening on port 4000");
// });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

// ⚠️ Pay attention to the fact that we are calling `listen` on the http server variable, and not on `app`.
httpServer.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
})