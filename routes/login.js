// This file holds the route for the login page and any sub-related pages
const express = require('express');
const router  = express.Router();
const bodyParser = require('body-parser');

module.exports = (db) => {

  router.get("/", (req, res) => {
    if (req.session.user_id) {
      let templateVars = {};

      db.query('SELECT * FROM users WHERE id = $1', [req.session.user_id])
      .then((result) => {
        templateVars = {user: result.rows[0]};
        res.render("login", templateVars);
      })
      .catch(err => console.log(err.message));
    } else {
      res.render("login");
    }
  });

  router.post("/", (req, res) => {
    const query = `
    SELECT * FROM users
    WHERE email = $1
    AND password = $2;
    `;

    const values = [req.body.email, req.body.password];

    db.query(query, values)
    .then((result) => {
      req.session.user_id = result.rows[0].id;
      res.redirect('/');
    })
    .catch(err => {
      console.log(err.message);
    });
  });
  return router;
};
