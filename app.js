var dotenv = require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const bcrypt = require('bcryptjs');

var indexRouter = require('./routes/index');

var app = express();

//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yl5n3.mongodb.net/secret-message?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(
  session({
    secret: `${process.env.SESSION_SECRET}`,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());
require('./config/passport');

app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
