var express = require('express');
//const models = require("./../models");

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login-ajax', function (req, res) {
  const userlist = ['sam', 'admin', 'another']

  res.send('Post data received')
})

module.exports = router;
