var express = require('express');
var router = express.Router();
var passport = require('passport');
require('passport-local');

var user_controller = require('../controllers/userController');
var message_controller = require('../controllers/messageController');
const message = require('../models/message');

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

router.post('/sign-in', user_controller.user_sign_in_post);

router.get('/sign-out', user_controller.user_sign_out_post);

router.get('/sign-up', function (req, res, next) {
  res.render('sign-up', { title: 'Sign Up Form' });
});

// POST request for creating User.
router.post('/sign-up', user_controller.user_create_post);

router.get('/second-sign-up', function (req, res, next) {
  res.render('second-sign-up', { title: 'Second Sign Up' });
});

router.post('/second-sign-up', user_controller.user_second_sign_up_post);

router.get('/board', message_controller.index);

router.get('/message-form', message_controller.message_form_get);

router.post('/message-form', message_controller.message_form_post);

module.exports = router;
