const { gql } = require('apollo-server-lambda');

const typeDefs = gql`
  type News {
    title: String!
    author: String
    description: String
    url: String!
    imageUrl: String
  }
  
  input NewsInput {
    title: String!
    author: String
    description: String
    url: String!
    imageUrl: String
  }

  type Query {
    getNews: [News]
  }
  
  type Mutation {
    createNews(input: NewsInput!): [News]
  }
  
  type Subscription {
    newsUpdated: [News]
  }
`;

module.exports = typeDefs;
