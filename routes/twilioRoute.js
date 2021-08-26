const http = require('http');
const express = require('express');
const { urlencoded } = require('body-parser');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const {messageCustomerComplete, messageCustomerUpdate, messageRestaurant} = require('./twilio.js')

const app = express();
app.use(urlencoded({ extended: false }));

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();
  // Access the message body and the number it was sent from.
  console.log(`${req.body.Body}`);
  twiml.message(messageCustomerUpdate("Bob", req.body.Body));

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});
