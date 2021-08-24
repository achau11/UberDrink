// This file holds the route for the sign-up page and any sub-related pages
const bodyParser = require('body-parser');
const express = require('express');
const { Pool } = require('pg');
const router  = express.Router();


module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render('register');
  });

  router.post("/", (req, res) => {
    const query = `
    INSERT INTO users (name, phone, email, password)
    VALUES
    ($1, $2, $3, $4)
    RETURNING *
    `;

    const values = [req.body.name, req.body.phone, req.body.email, req.body.password];

    db.query(query, values)
    .then((result) => {
      console.log('Registered');
      res.redirect('/login');
    })
    .catch(err => {
      console.log(err.message);
    });
  }); //end post

  return router;
};
