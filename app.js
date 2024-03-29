var express = require('express'),
    path = require('path'),
    cookieParser=require('cookie-parser'),
    bodyParser=require('body-parser'),
    expressHandleBars=require('express-handlebars'),
    //expressHandlebarsSections = require('express-handlebars-sections'),
    expressValidador=require('express-validator'),
    flash=require('connect-flash'),
    session=require('express-session'),
    passport=require('passport'),
    LocalStrategy=require('passport-local').Strategy,
    mongo=require('mongodb'),
    config=require('./config/database')
    mongoose = require('mongoose');


let middleware = require('./config/middleware');

var express = require('express');
var app = express();

var User = require("./models/user");

    mongoose.connect(config.development);
var db=mongoose.connection;

// routes
var routes = require('./routes/index.route'),
    homeRoute = require('./routes/home.route'),
    userRoute = require('./routes/users.route'),
    apiRoute = require('./routes/api.route'),
    syncRoute = require('./routes/sync.route'),
    authenticationRoute = require('./routes/authentication.route');

var helpers=require('./helpers/app.helpers');
// Init App
var app= express();
var server = require("http").Server(app);

app.set('port',(process.env.PORT || 8800));
server.listen(app.get('port'),function(){
  console.log('Listinig to port '+app.get('port'));
});

// View engine
app.set('views',path.join(__dirname,'views'));
app.engine('handlebars',expressHandleBars({
  defaultLayout:'layout',
  helpers: helpers
//  section: expressHandlebarsSections()  
}));
app.set('view engine','handlebars');

// body parse midlleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());


// set Static forlder
app.use(express.static(path.join(__dirname,'public')));

// Express session
app.use(session({
  secret:'secret'/* validate possibility of default RSA */,
  saveUninitialized:true,
  resave:true
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// express validator
// : rever validação
app.use(expressValidador({
  errorFormatter:function(param,msg,value){
    var namespace = param.split('.')
      , root = namespace.shift()
      , formParam = root;

      while(namespace.length){
        formParam+='['+ namespace.shift()+']'
      }
      return {
        param: formParam,
        msg: msg,
        value: value
      }
  }
}));

// connect Flash
app.use(flash());

// global vars
app.use(function(req,res,next){
  res.locals.success_msg = req.flash('susses_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  res.locals.url=req.url.split('/')[1] || 'home'
  res.locals.hostname=req.hostname
  next();
})

app.use('/',homeRoute);
app.use('/io',userRoute);
app.use('/sync',syncRoute);
app.use('/api', middleware.checkToken, apiRoute);
app.use('/authentication',authenticationRoute);

app.get('/authentication/github',
passport.authenticate('github'));

/**-- */
app.get('/authentication/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/io');
  });


