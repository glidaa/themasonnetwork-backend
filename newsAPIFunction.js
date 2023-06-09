// newsAPIFunction.js
const dotenv = require('dotenv');
dotenv.config();
console.log('starting');
console.log(process.env);
const axios = require('axios');
const { print } = require('graphql/language/printer');
const gql = require('graphql-tag');
const mutations = require('./mutations');

exports.handler = async (event, context) => {
  try {
    // Retrieve news data from API
    console.log('Before axios.get call');
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country: 'us',
        apiKey: process.env.NEWS_API_KEY
      }
    });
    console.log('After axios.get call');
    console.log(response.data);
    console.log('Before format call');
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
    console.log('after fromat call');
    console.log(news);
    console.log('Before newsdata to graphql call');
    // Publish news data to GraphQL database
    const mutation = gql(print(mutations.createNews));
    const variables = { input: { news: news } };
    console.log('Before post request call');
    // Send a POST request to the GraphQL endpoint to add the news to the database
    const { data } = await axios.post(process.env.REACT_APP_GRAPHQL_ENDPOINT, {
      query: mutation,
      variables: variables
    });
    console.log('return');
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



