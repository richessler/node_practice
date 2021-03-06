// Generated by CoffeeScript 1.10.0
(function() {
  var User, express, passport, router;

  express = require('express');

  passport = require('passport');

  User = require('./models/user');

  router = express.Router();

  router.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.errors = req.flash('error');
    res.locals.infos = req.flash('info');
    return next();
  });

  router.get('/', function(req, res, next) {
    return User.find().sort({
      createdAt: 'descending'
    }).exec(function(err, users) {
      if (err) {
        return next(err);
      }
      return res.render('index', {
        users: users
      });
    });
  });

  router.get("/signup", function(req, res) {
    return res.render("signup");
  });

  router.post("/signup", function(req, res, next) {
    var password, username;
    username = req.body.username;
    password = req.body.password;
    User.findOne({
      username: username
    }, function(err, user) {
      var newUser;
      if (err) {
        return next(err);
      }
      if (user) {
        req.flash("error", "User already exists");
        return res.redirect("/signup");
      }
      newUser = new User({
        username: username,
        password: password
      });
      return newUser.save(next);
    });
    return passport.authenticate("login", {
      successRedirect: "/",
      failureRedirect: "/signup",
      failureFlash: true
    });
  });

  module.exports = router;

}).call(this);

//# sourceMappingURL=routes.js.map
