const express = require('express');
const router  = express.Router();

module.exports = (time) => {
  router.get("/", (req, res) => {
    res.render('status', {time: time});
  });
  return router;
};
