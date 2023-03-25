// newsAPIFunction.js
require('dotenv').config();
const { createHttpLink } = require('apollo-link-http');
const { ApolloClient } = require('apollo-client');
const { InMemoryCache } = require('apollo-cache-inmemory');
const gql = require('graphql-tag');

const graphqlUrl = process.env.REACT_APP_GRAPHQL_ENDPOINT;

const client = new ApolloClient({
  link: createHttpLink({
    uri: graphqlUrl,
    fetch: fetch
  }),
  cache: new InMemoryCache()
});

// Publish news data to GraphQL database
const mutation = gql(print(mutations.createNews));
const variables = { input: { news: news } };

await client.mutate({
  mutation: mutation,
  variables: variables
});
