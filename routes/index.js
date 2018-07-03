var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login-ajax', function (req, res) {
  //use this as available users for now
  const userlist = ['sam', 'admin', 'another']

  res.send('Got a POST request')
})

module.exports = router;
