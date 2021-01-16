const express = require('express');
const { typeDefs, resolvers } = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const { ApolloServer, gql } = require('apollo-server-express');

const app = express();

app.use(cors());

mongoose.connect('mongodb://test:qwe123@localhost:27017/readinglist', {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.once('open', () => {
    console.log('connected to database');
});

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

app.listen(4000, () => {
    console.log("listening on port 4000");
});