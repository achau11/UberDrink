const http = require('http');
const express = require('express');
const router  = express.Router();
const bodyParser = require('body-parser');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const {messageCustomerComplete, messageCustomer, messageRestaurant} = require('../public/scripts/twilio')

module.exports = () => {
  let waitTime = 0;
  router.post('/', (req, res) => {
    const twiml = new MessagingResponse();
    twiml.message(messageRestaurant());
console.log('route hit');
    res.render('status', {time: null});
  });

  router.post('/received', (req, res) => {
    const twiml = new MessagingResponse();
    twiml.message(messageCustomer('+13432971071', req.body.Body));
    console.log('received', req.body.Body);
    waitTime = req.body.Body;
    res.redirect('/');

  });

  router.get('/', (rq, res)=> {
    console.log('get route')
    console.log('waitTime: ', waitTime);
    res.render('status', {time: waitTime});
  });

  return router;
};

