const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
require('dotenv').config();

const client = require('twilio')();

const sendMessageToRestaurant = (order) => {
  client.messages.create({
    to: process.env.MY_PHONE_NUMBER,
    from: '+14377476201',
    body: `You have received an order of ${order}`
  })
  .then((message) => console.log(message.sid));
}

sendMessageToRestaurant('coffee');



