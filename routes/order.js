const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
      db.query('SELECT * FROM items')
      .then((result) => {
        res.render("order", {items: result.rows});
      })
      .catch(err => console.log(err.message));
    });
  return router;
};
