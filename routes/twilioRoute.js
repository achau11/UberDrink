const http = require('http');
const express = require('express');
const router  = express.Router();
const bodyParser = require('body-parser');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const {messageCustomerComplete, messageCustomer, messageRestaurant} = require('../public/scripts/twilio')

module.exports = () => {
  router.post('/', (req, res) => {
    const twiml = new MessagingResponse();
    twiml.message(messageRestaurant());

    res.render('status', {time: null});
  });

  router.post('/received', (req, res) => {
    const twiml = new MessagingResponse();
    twiml.message(messageCustomer('+13432971071', req.body.Body));

    res.render('status', {time: req.body.Body});
  });

  return router;
};

