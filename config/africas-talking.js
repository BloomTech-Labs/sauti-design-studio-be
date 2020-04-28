require('dotenv').config();

/*This file sets up the Africastalking API with the proper API Key from the environment file. 
  Pusher is no longer used in this project as of July 7th, 2019*/

module.exports = {
  AT: {
    apiKey: process.env.AT_API_KEY,
    username: 'sandbox',
    format: 'json',
  },

};
