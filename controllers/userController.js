var User = require('../models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const { body, validationResult } = require('express-validator');

exports.user_create_post = [
  body('first_name')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('First name must be specified.')
    .isAlphanumeric()
    .withMessage('First name has non-alphanumeric'),
  body('last_name')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Last name must be specified')
    .isAlphanumeric()
    .withMessage('Must be alphanumeric'),
  body('password')
    .trim()
    .isLength({ min: 6 })
    .escape()
    .withMessage('Last name must be at least 6 characters')
    .isAlphanumeric()
    .withMessage('Must be alphanumeric'),
  body('email').isEmail(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('sign-up', {
        title: 'Sign Up',
        user: req.body,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid
      bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) {
          return next(err);
        }
        var user = new User({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          password: hashedPassword,
          is_a_member: false,
          email: req.body.email,
        });
        user.save(function (err) {
          if (err) {
            return next(err);
          }
          res.redirect('second-sign-up');
        });
      });
    }
  },
];
