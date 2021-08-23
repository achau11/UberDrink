// This file holds the route for the sign-up page and any sub-related pages
const express = require('express');
const router  = express.Router();

module.exports = () => {
  router.get("/register", (req, res) => {
    res.render('register');
  });
  return router;
};
