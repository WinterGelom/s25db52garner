var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var lumberRouter = require('./routes/lumber');
var gridRouter = require('./routes/grid');
var pickRouter = require('./routes/pick');
var resourceRouter = require('./routes/resource');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done){
    Account.findOne({username: username})
      .then(function (user){
        if(err){return done(err);}
        if(!user){
          return done(null, false, {message: 'Incorrect username.'});
        }
        if(!user.validPassword(password)){
          return done(null, false, {message: 'Incorrect password.'});
        }
        return done(null, user);
      }).catch(function(err){
        return done(err)
      })
  }
))

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
  secret:'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/lumber', lumberRouter);
app.use('/grid', gridRouter);
app.use('/pick', pickRouter);
app.use('/resource', resourceRouter);

//connect to the database
require('dotenv').config();
const connectionString = process.env.MONGO_CON
var mongoose = require('mongoose')
mongoose.connect(connectionString);

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once("open", function(){
  console.log("Connection to DB succeeded")
})

var Lumber = require("./models/lumber");

//Server start
async function recreateDB(){
  //Delete everything
  await Lumber.deleteMany();

  //New data
  let instance1 = new Lumber({lumber_type: "Cedar", cost: 10, length: 5});
  let instance2 = new Lumber({lumber_type: "pine", cost: 15, length: 10});
  let instance3 = new Lumber({lumber_type: "Hardwood", cost: 5, length: 20});

  //saving data
  instance1.save().then(doc=>{
    console.log("First object saved")
  }).catch(err=>{
    console.error(err)
  });
  instance2.save().then(doc=>{
    console.log("Second object saved")
  }).catch(err=>{
    console.error(err)
  });
  instance3.save().then(doc=>{
    console.log("Third object saved")
  }).catch(err=>{
    console.error(err)
  });
}

let reseed = true;
if (reseed) {recreateDB();}

//passport config
//The Account model
var Account = require('./models/account');

passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
