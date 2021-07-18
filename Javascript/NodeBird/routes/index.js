const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/join', (req, res) => {
  res.render('join');
})

module.exports = router;
