// This file holds the route for the sign-up page and any sub-related pages
const bodyParser = require('body-parser');
const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');


module.exports = (db) => {
  router.get("/", (req, res) => {
    if (req.session.user_id) {
      let templateVars = {};

      db.query('SELECT * FROM users WHERE id = $1', [req.session.user_id])
      .then((result) => {
        templateVars = {user: result.rows[0]};
        res.render("register", templateVars);
      })
      .catch(err => console.log(err.message));
    } else {
      res.render("register");
    }
  });

  router.post("/", (req, res) => {
    const query = `
    INSERT INTO users (name, phone, email, password)
    VALUES
    ($1, $2, $3, $4)
    RETURNING *
    `;
    const password = bcrypt.hashSync(req.body.password, 10);    //hash password
    const values = [req.body.name, req.body.phone, req.body.email, password];

    db.query(query, values)
    .then((result) => {
      res.redirect('/login');
    })
    .catch(err => {
      console.log(err.message);
    });
  }); //end post

  return router;
};
