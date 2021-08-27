const http = require('http');
const express = require('express');
const router  = express.Router();
const bodyParser = require('body-parser');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const {messageCustomerComplete, messageCustomer, messageRestaurant} = require('../public/scripts/twilio')

module.exports = (db) => {
  let waitTime = 0;
  router.post('/', (req, res) => {
    const twiml = new MessagingResponse();
    twiml.message(messageRestaurant());

    if (req.session.user_id) {
      db.query('SELECT * FROM users WHERE id = $1', [req.session.user_id])
      .then((result) => {
        res.render("status", {user: result.rows[0], time: null});
      })
      .catch(err => console.log(err.message));
    } else {
      res.redirect("/login");
    }
  });

  router.post('/received', (req, res) => {
    const twiml = new MessagingResponse();
    twiml.message(messageCustomer('+13432971071', req.body.Body));
    console.log('received', req.body.Body);
    waitTime = req.body.Body;
    res.redirect('/');

  });

  router.get('/', (req, res)=> {
    if (req.session.user_id) {
      db.query('SELECT * FROM users WHERE id = $1', [req.session.user_id])
      .then((result) => {
        res.render("status", {user: result.rows[0], time: waitTime});
      })
      .catch(err => console.log(err.message));
    } else {
      res.redirect("/login");
    }
  });

  return router;
};

