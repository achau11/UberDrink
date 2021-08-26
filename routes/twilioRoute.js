const http = require('http');
const express = require('express');
const router  = express.Router();
const bodyParser = require('body-parser');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const {messageCustomerComplete, messageCustomerUpdate, messageRestaurant} = require('../public/scripts/twilio')


module.exports = () => {
  router.post('/', (req, res) => {
    const twiml = new MessagingResponse();
    twiml.message(messageCustomerUpdate("Bob", "Order received. How long will it take to get order ready?"));

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  });

  router.post('/received', (req, res) => {
    console.log(req.body);
    res.send(`
      <Response>
        <Message>
          Customer notified
        </Message>
      </Response>
    `);
  });

  return router;
};

