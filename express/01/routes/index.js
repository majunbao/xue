var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/world', function(req, res, next) {
  console.log(req.url);
  res.render('index', { title: 'World' });
});

router.post('/world', function(req, res, next) {
  res.render('index', { title: 'World Post' });
});

router.get('/book', function(req, res, next) {
  res.json({
    name: 'john',
    age: 28,
    hobby: ['篮球', '两年半']
  })
});

router.get('/book2', function(req, res, next) {
  res.redirect('/book')
});

module.exports = router;
