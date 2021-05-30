var Message = require('../models/message');
const { body, validationResult } = require('express-validator');

// show message board
exports.index = function (req, res, next) {
  if (!req.user) {
    res.redirect('sign-in');
  } else {
    Message.find()
      .sort([['timeStamp', 'ascending']])
      .exec(function (err, list_messages) {
        if (err) {
          return next(err);
        }
        // options to format time string
        const options = { month: 'short', day: '2-digit' };

        // successful so render
        res.render('board', {
          options: options,
          message_list: list_messages,
        });
      });
  }
};

exports.message_form_get = function (req, res, next) {
  if (!req.user) {
    res.redirect('sign-in');
  } else {
    res.render('message-form');
  }
};

exports.message_form_post = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 50 })
    .escape()
    .withMessage('Title must be specified.')
    .isAlphanumeric()
    .withMessage('Title has non-alphanumeric'),
  body('message')
    .trim()
    .isLength({ min: 1, max: 500 })
    .escape()
    .withMessage('Message must be specified')
    .isAlphanumeric()
    .withMessage('Message must be alphanumeric'),
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('message-form', {
        title: 'Message form',
        errors: errors.array(),
      });
      return;
    } else {
      var message = new Message({
        title: req.body.title,
        message: req.body.message,
        user: req.user,
        timeStamp: new Date(),
      });
      message.save(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect('board');
      });
    }
  },
];
