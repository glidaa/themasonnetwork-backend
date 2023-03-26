const axios = require('axios');
const { print } = require('graphql/language/printer');
const gql = require('graphql-tag');
const mutations = require('./mutations');
const dotenv = require('dotenv');
dotenv.config();

console.log('Starting news API function');

exports.handler = async (event, context) => {
  try {
    console.log('Before axios.get call');

    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country: 'us',
        apiKey: process.env.NEWS_API_KEY
      }
    });

    console.log('After axios.get call');
    console.log(response.data);

    const news = response.data.articles.map((article) => {
      return {
        title: article.title,
        author: article.author,
        description: article.description,
        url: article.url,
        imageUrl: article.urlToImage
      };
    });

    console.log(news);

    const mutation = gql(print(mutations.createNews));
    const variables = { input: { news: news } };

    const { data } = await axios.post(process.env.REACT_APP_GRAPHQL_ENDPOINT, {
      query: mutation,
      variables: variables
    });

    console.log('Data:', data);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'News updated successfully' })
    };
  } catch (error) {
    console.log('Error:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error updating news' })
    };
  }
};
