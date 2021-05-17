var express = require('express');
var router = express.Router();
var passport = require('passport');
require('passport-local');

var user_controller = require('../controllers/userController');
var message_controller = require('../controllers/messageController');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Secret Messager',
    user: req.user,
  });
});

router.get('/sign-in', function (req, res, next) {
  res.render('sign-in', { title: 'Sign in' });
});

router.post(
  '/sign-in',
  passport.authenticate('local', {
    successRedirect: '/board',
    failureRedirect: '/',
  })
);

router.get('/sign-up', function (req, res, next) {
  res.render('sign-up', { title: 'Sign Up Form' });
});

// POST request for creating User.
router.post('/sign-up', user_controller.user_create_post);

router.get('/second-sign-up', function (req, res, next) {
  res.render('second-sign-up', { title: 'Second Sign Up' });
});

router.get('/board', message_controller.index);

module.exports = router;
