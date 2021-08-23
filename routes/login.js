// This file holds the route for the login page and any sub-related pages
const express = require('express');
const router  = express.Router();

module.exports = () => {
  router.get("/login", (req, res) => {
    res.render('login');
  });
  return router;
};
