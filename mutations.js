const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Mutation {
    createNews(input: NewsInput!): News!
    updateNews(id: ID!, input: NewsInput!): News!
    deleteNews(id: ID!): Boolean!
  }
  
  input NewsInput {
    title: String!
    author: String!
    description: String!
    url: String!
    imageUrl: String!
    joke: String
    content: String
    source: String
    publishedAt: String
  }
  
  type News {
    id: ID!
    title: String!
    author: String!
    description: String!
    url: String!
    imageUrl: String!
    joke: String
    content: String
    source: String
    publishedAt: String
  }
`;

module.exports = typeDefs;
