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
  body('email').isEmail(),
  body('password')
    .trim()
    .isLength({ min: 6 })
    .escape()
    .withMessage('Last name must be at least 6 characters')
    .isAlphanumeric()
    .withMessage('Must be alphanumeric'),
  body('confirm-password')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Enter a confirm password.')
    .escape()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation is incorrect');
      } else {
        return true;
      }
    }),

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
          req.login(user, function (err) {
            if (err) {
              return next(err);
            }
            res.redirect('second-sign-up');
          });
        });
      });
    }
  },
  // need to put sign in stuff here from below
  // next()
  //
];

exports.user_second_sign_up_post = [
  body('password').trim().escape().equals('mouth'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('second-sign-up', {
        errors: errors.array(),
      });
    } else {
      const is_admin = req.body.admin === 'on';
      console.log('this is the response from the radio' + req.body.admin);

      User.findByIdAndUpdate(
        req.user._id,
        { is_a_member: true, is_admin: is_admin },
        {},
        function (err, result) {
          if (err) {
            res.redirect('second-sign-up');
          } else {
            res.redirect('board');
          }
        }
      );
    }
    // then add the rest of the stuff to update their profile here and redirect
  },
];

exports.user_sign_in_post = [
  body('email')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Enter an email address')
    .escape(),
  body('password')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Enter a password')
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('sign-in', {
        email: req.body.email,
        errors: errors.array(),
      });
    }
    next();
  },
  // copy this stuff
  ('/sign-in',
  passport.authenticate('local', {
    successRedirect: '/board',
    failureRedirect: '/',
  })),
];

exports.user_sign_out_post = function (req, res, next) {
  req.logout();
  res.redirect('/');
};
