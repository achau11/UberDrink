const http = require('http');
const express = require('express');
const router  = express.Router();
const { urlencoded } = require('body-parser');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const {messageCustomerComplete, messageCustomerUpdate, messageRestaurant} = require('../public/scripts/twilio')


module.exports = () => {
  router.post('/', (req, res) => {
    const twiml = new MessagingResponse();
    console.log(`${req.body.Body}`);
    twiml.message(messageCustomerUpdate("Bob", req.body.Body));

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  });

  return router;
};

