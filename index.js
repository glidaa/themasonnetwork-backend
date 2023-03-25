// index.js 
const express = require('express');
const serverless = require('serverless-http');
const { ApolloServer } = require('apollo-server-express');
const { gql } = require('apollo-server-express');
const fsp = require('fs-extra').promises;


// Define your GraphQL schema
const typeDefs = gql`
  type Query {
    news: [NewsItem]
  }

  type NewsItem {
    id: ID!
    title: String!
    content: String!
    url: String!
    author: String
    publishedAt: String!
  }
`;

// Define your GraphQL resolvers
const resolvers = {
  Query: {
    news: async () => {
      // Fetch news data from an API, database, or other sources
      // Return an array of news items
    },
  },
};

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

module.exports.handler = serverless(app);
