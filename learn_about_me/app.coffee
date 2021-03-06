express = require 'express'
mongoose = require 'mongoose'
path = require 'path'
bodyParser = require 'body-parser'
cookieParser = require 'cookie-parser'
session = require 'express-session'
flash = require 'connect-flash'

routes = require './routes'
app = express()

mongoose.connect 'mongodb://localhost:27017/test'

app.set 'port', process.env.PORT || 3000

app.set 'views', path.join(__dirname, 'views')
app.set 'view engine', 'jade'

app.use bodyParser.urlencoded extended: false
app.use cookieParser()
app.use session
  secret: 'TKRv0IJs=HYqrvagQ#&!F!%V]Ww/4KiVs$s,<<M'
  resave: true
  saveUninitialized: true
app.use flash()

app.use routes

app.listen app.get('port'), ->
  console.log "Server started on port #{app.get('port')}"
