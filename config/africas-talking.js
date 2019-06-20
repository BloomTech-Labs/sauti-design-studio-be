require('dotenv').config();

module.exports = {
  AT: {
    apiKey: process.env.AT_API_KEY,
    username: 'sandbox',
    format: 'json',
  },
  pusher: {
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: 'us2',
    // encrypted: true,
  },
};
