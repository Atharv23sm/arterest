var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');
const dotenv = require('dotenv')
dotenv.config({path:__dirname+'/.env'});

var indexRouter = require('./routes/auth');
var homeRouter = require('./routes/home');
const connectDB = require('./config/db');

connectDB();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const MemoryStore = require('memorystore')(session)

app.use(session({
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
    resave: false,
    saveUninitialized:false,
    secret: 'keyboard cat'
}));

app.use(flash());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'uploads')));

app.use('/', indexRouter);
app.use('/', homeRouter);
// app.use('/users', usersRouter);

module.exports = app;

