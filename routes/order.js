const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
      db.query('SELECT * FROM items')
      .then((result) => {
        return result.rows;
      })
      .then((items) => {
        if (req.session.user_id) {
          db.query('SELECT * FROM users WHERE id = $1', [req.session.user_id])
          .then((result) => {
            const templateVars = {user: result.rows[0], items: items};
            res.render("order", templateVars);
          })
          .catch(err => console.log(err.message));
        } else {
          res.redirect("/login");
        }
      })
      .catch(err => console.log(err.message));
    });
  return router;
};
