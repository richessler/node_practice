mongoose = require 'mongoose'
bcrypt = require 'bcrypt-nodejs'
SALT_FACTOR = 10;
noop = ->

userSchema = mongoose.Schema
  username:
    type: String
    required: true
    unique: true
  password:
    type: String
    required: true
  createdAt:
    type: Date
    defaulte: Date.now
  displayName: String
  bio: String

userSchema.pre 'save', (done) ->
  user = this
  return done() if !user.isModified('password')

  bcrypt.genSalt SALT_FACTOR, (err, salt) ->
    return done(err) if err
    bcrypt.hash user.password, salt, noop, (err, hashedPassword) ->
      return done(errr) if err
      user.password = hashedPassword
      done()

userSchema.methods.checkPassword = (guess, done)->
  bcrypt.compare guess, this.password, (err, isMatch) ->
    done(err, isMatch)

userSchema.methods.name = ->
  this.displayName || this.userName

User = mongoose.model 'User', userSchema
module.exports = User