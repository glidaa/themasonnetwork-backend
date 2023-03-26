// newsAPIFunction.js
const dotenv = require('dotenv');
dotenv.config();


const AWS = require('aws-sdk');
const axios = require('axios');
const { print } = require('graphql/language/printer');
const { createHttpLink } = require('apollo-link-http');
const { ApolloClient } = require('apollo-client');
const { InMemoryCache } = require('apollo-cache-inmemory');
const gql = require('graphql-tag');
const schema = require('./schema');
const mutations = require('./mutations');

const graphqlUrl = process.env.REACT_APP_GRAPHQL_ENDPOINT;

const client = new ApolloClient({
  link: createHttpLink({
    uri: graphqlUrl,
    fetch: fetch
  }),
  cache: new InMemoryCache()
});

exports.handler = async (event, context) => {
  try {
    // Retrieve news data from API
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country: 'us',
        apiKey: process.env.NEWS_API_KEY
      }
    });
    
    console.log(response.data);
    // Format news data to match GraphQL schema
    const news = response.data.articles.map((article) => {
      return {
        title: article.title,
        author: article.author,
        description: article.description,
        url: article.url,
        imageUrl: article.urlToImage
      }
    });
    
    // Publish news data to GraphQL database
    const mutation = gql(print(mutations.createNews));
    const variables = { input: { news: news } };
    
    await client.mutate({
      mutation: mutation,
      variables: variables
    });
      
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'News updated successfully' })
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error updating news' })
    };
  }
};
