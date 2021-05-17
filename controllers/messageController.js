var Message = require('../models/message');

exports.index = function (req, res, next) {
  res.render('board', { title: 'Message board', user: req.user });
};
