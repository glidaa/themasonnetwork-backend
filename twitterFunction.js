// twitterFunction.js
const axios = require('axios');
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const chatGPTFunction = require('./chatGPTFunction');
const Twit = require('twit');

const T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_SECRET,
  timeout_ms: 60 * 1000,
  strictSSL: true,
});

async function fetchTweets() {
  try {
    const response = await T.get('search/tweets', { q: 'breaking news', count: 10 });
    return response.data.statuses;
  } catch (error) {
    console.error('Error fetching tweets:', error);
    return [];
  }
}

exports.handler = async (event) => {
  const tweets = await fetchTweets();

  for (const tweet of tweets) {
    const joke = await chatGPTFunction.generateJoke(tweet.text);
    const item = {
      id: tweet.id_str,
      title: tweet.text,
      url: `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`,
      publishedAt: tweet.created_at,
      joke: joke,
    };

    await storeNewsItem(item);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Tweets processed' }),
  };
};
