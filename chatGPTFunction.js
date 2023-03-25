// chatGPTFunction.js
const axios = require('axios');
require('dotenv').config();
const CHAT_GPT_API_KEY = process.env.CHAT_GPT_API_KEY;

async function generateJoke(text) {
  const url = 'https://api.openai.com/v1/engines/davinci-codex/completions';
  const prompt = `Create a funny headline based on the news: "${text}"`;

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${CHAT_GPT_API_KEY}`,
  };

  const data = {
    prompt: prompt,
    max_tokens: 20,
    n: 1,
    stop: null,
    temperature: 0.7,
  };

  try {
    const response = await axios.post(url, data, { headers: headers });
    const joke = response.data.choices[0].text.trim();
    return joke;
  } catch (error) {
    console.error('Error generating joke:', error);
    return '';
  }
}

module.exports = {
  generateJoke,
};
