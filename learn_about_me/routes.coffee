express = require 'express'
passport = require 'passport'

User = require './models/user'

router = express.Router()

router.use (req, res, next) ->
  res.locals.currentUser = req.user
  res.locals.errors = req.flash 'error'
  res.locals.infos = req.flash 'info'
  next()

router.get '/', (req, res, next) ->
  User.find()
  .sort createdAt: 'descending'
  .exec (err, users) ->
    return next(err) if err
    res.render 'index', users: users

router.get "/signup", (req, res) ->
  res.render "signup"

router.post "/signup", (req, res, next) ->
  username = req.body.username
  password = req.body.password
  User.findOne username: username , (err, user) ->
    return next(err) if err
    if (user)
      req.flash "error", "User already exists"
      return res.redirect "/signup"

    newUser = new User
      username: username
      password: password

    newUser.save(next)
  passport.authenticate "login",
    successRedirect: "/"
    failureRedirect: "/signup"
    failureFlash: true

module.exports = router