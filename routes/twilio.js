const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
require('dotenv').config();

const client = require('twilio')();

const messageRestaurant = (order) => {
  client.messages.create({
    to: process.env.MY_PHONE_NUMBER,
    from: '+14377476201',
    body: `Hi! You have received an order of ${order}! Respond to this message with the amount of time it'll take to complete the order. (ex. entering 30 would mean 30 minutes)`
  })
  .then((message) => console.log(message.sid));
}

const messageCustomerUpdate = (customerName, time) => {
  client.messages.create({
    to: process.env.MY_PHONE_NUMBER,
    from: '+14377476201',
    body: `Hi ${customerName}! Your order will be ready in ${time} mins :)`
  })
  .then((message) => console.log(message.sid));

}

const messageCustomerComplete= (customerName) => {
  client.messages.create({
    to: process.env.MY_PHONE_NUMBER,
    from: '+14377476201',
    body: `Hi ${customerName}! Your order is now ready for pickup. Enjoy! :)`
  })
  .then((message) => console.log(message.sid));
}

// Receiving SMS
const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app = express();

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  const message = twiml.message();
  message.body('The Robots are coming! Head for the hills!');
  message.media('https://farm8.staticflickr.com/7090/6941316406_80b4d6d50e_z_d.jpg');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});








module.exports = {messageCustomerComplete, messageCustomerUpdate, messageRestaurant};
