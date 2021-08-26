// This file holds the route for the login page and any sub-related pages
const express = require('express');
const router  = express.Router();
const bodyParser = require('body-parser');
const { json } = require('body-parser');
const bcrypt = require('bcrypt');

module.exports = (db) => {

  router.get("/", (req, res) => {
    if (req.session.user_id) {

      db.query('SELECT * FROM users WHERE id = $1', [req.session.user_id])
      .then((result) => {
        const templateVars = {user: result.rows[0]};
        res.render("login", templateVars);
      })
      .catch(err => console.log(err.message));
    } else {
      res.render("login", {user: null});
    }
  });

  router.post("/", (req, res) => {
    db.query(`SELECT * FROM users WHERE email = $1`, [req.body.email])
    .then((result) => {
      if(!bcrypt.compareSync(req.body.password, result.rows[0].password)   // Check against hashed passwords and normal passwords from dummy data
        && req.body.password != result.rows[0].password)
      {
        res.send(403, 'Wrong Password');
      } else {
        req.session.user_id = result.rows[0].id;
        res.redirect('/');
      }
    })
    .catch(err => {
      json.send(err.message);
    });
  });
  return router;
};
