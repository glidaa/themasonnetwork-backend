require('dotenv').config();
const fetch = require('node-fetch');
const endpoint = process.env.REACT_APP_GRAPHQL_ENDPOINT;

fetch(endpoint, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query: `
      {
        allNews {
          id
          title
          author
          description
          url
          imageUrl
        }
      }
    `,
  }),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
