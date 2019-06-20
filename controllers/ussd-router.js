const router = require('express').Router();

// Function to create a new menu. Recommended to create a new menu for each request
// configure AT
const webURL = 'http://foodigo.com/menu';
const welcomeMsg = `CON Hello and welcome to Foodigo.
Have your food delivered to you fast and hot!
Please find our menu ${webURL}
Enter your name to continue`;

const orderDetails = {
  name: '',
  description: '',
  address: '',
  telephone: '',
  open: true,
};
let lastData = '';

router.post('/', function(req, res) {
  console.log(req.body);
  let message = 'Hello';

  const { sessionId } = req.body;
  const { serviceCode } = req.body;
  const { phoneNumber } = req.body;
  const { text } = req.body;
  const textValue = text.split('*').length;

  if (text === '') {
    message = welcomeMsg;
  } else if (textValue === 1) {
    message = 'CON What do you want to eat?';
    orderDetails.name = text;
  } else if (textValue === 2) {
    message = 'CON Where do we deliver it?';
    orderDetails.description = text.split('*')[1];
  } else if (textValue === 3) {
    message = "CON What's your telephone number?";
    orderDetails.address = text.split('*')[2];
  } else if (textValue === 4) {
    message = `CON Would you like to place this order?
        1. Yes
        2. No`;
    lastData = text.split('*')[3];
  } else {
    message = `END Thanks for your order
        Enjoy your meal in advance`;
    orderDetails.telephone = lastData;
  }

  res.contentType('text/plain');
  res.send(message, 200);

  console.log(orderDetails);
  if (
    orderDetails.name !== '' &&
    orderDetails.address !== '' &&
    orderDetails.description !== '' &&
    orderDetails.telephone !== ''
  ) {
    pusher.trigger('orders', 'customerOrder', orderDetails);
  }
  if (orderDetails.telephone !== '') {
    // reset data
    orderDetails.name = '';
    orderDetails.description = '';
    orderDetails.address = '';
    orderDetails.telephone = '';
  }
});

module.exports = router;
