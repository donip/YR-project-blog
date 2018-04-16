const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const db = require('./config/database')
const helmet = require('helmet')
const morgan = require('morgan')
const fs = require('fs')
const https = require('https');

const postRouter = require('./routes/post.route')
const app = express()

// engedélyezés angularra
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
//-----------------------------------------


// Connect to MongoDB
mongoose.connect(db.uri, db.options).then(
  () => {
    console.log('MongoDB connected.')
  },
  err => {
    console.error('MongoDB error.:' + err)
  }
)

// Get view File Path
/*function view (path) {
  return __dirname + '/views/' + path
}*/

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}))

// Parse application/json
app.use(bodyParser.json())

// Minden kérés loggolása
app.use(morgan('dev', {stream: fs.createWriteStream('./access.log', {flags: 'a'})}))

// basic secure
app.use(helmet())



// Home page
app.use('/post', postRouter)



// Start server
// const server = https.createServer(httpsOptions, app)
// server.listen(3003, function(){
//   console.log("server running at https://localhost:3000/")
// });

app.listen(3004);