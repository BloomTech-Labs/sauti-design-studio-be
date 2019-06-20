require('dotenv').config();

module.exports = {
  AT: {
    apiKey: process.env.AT_API_KEY,
    username: 'sandbox',
    format: 'json',
  },
  pusher: {
    appId: '808353',
    key: '5f2f3ae5e4171e326f3f',
    secret: 'a3c402f0a3e3d243701f',
    cluster: 'us2',
    encrypted: true,
  },
};
