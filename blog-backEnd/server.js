const express = require('express');
const passport = require('passport');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream');
const cors = require('cors');
const session = require('express-session');
const mongoose = require('mongoose');

const User = require('./models/user');
const Blogpost = require('./models/blogpost');
const Comment = require('./models/comment');
const userRouter = require('./routes/user.route')
const db = require('./config/database.js');

const logDirectory = path.join(__dirname, 'log');
const port = process.env.PORT || 8080;
const app = express();

///--- engedélyezés az angularra
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
//Connect to MongoDB
mongoose.connect(db.uri, db.options,
    () => {
        console.log('MongoDB connected');
    },
    err => {
        console.error('MongoDB error: ' + err)
    }
)

// Logging
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
let accessLogStream = rfs('access.log', {
    interval: '1d',  // 1 day >> naponta fogja létrehozni
    path: logDirectory,
})

app.use(morgan('combined', {  // logolás formátumának meghatározása
    stream: accessLogStream,
    skip: (req, res) => {res.statusCode < 400;}  // csak a hibás kódokat logolja (400-599)
}));


// Security
app.use(helmet());

// Enable CORS
app.use(cors());

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Cookie handling
app.use(cookieParser());

// Session handling
app.use(session({
    secret: 'YOUR_SECRET_KEY',
    resave: true,
    saveUninitialized: true
}));

// Passport Auth
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// passport.use(Blogpost.createStrategy());
// passport.serializeUser(Blogpost.serializeUser());
// passport.deserializeUser(Blogpost.deserializeUser());

// User router
app.use('/', userRouter);

// Start server
app.listen(port);
console.log('The magic happens on port ' + port);
