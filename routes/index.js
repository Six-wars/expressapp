var express = require('express');
const models = require("./../models");

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login-ajax', function (req, res) {
  //assume the front end ensured there's valid post data
  let existing = models.user.findAll({
  	where: {
  		username: 'ME'
  	}
  });

  res.send('Post data received')
})

module.exports = router;
