// index.js
const { handler: updateNews } = require('./newsAPIFunction');


// Mock event and context objects
const event = {};
const context = {};

// Call the updateNews function with the mock event and context objects
updateNews(event, context)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
