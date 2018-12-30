// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Authenticates whether the user has valid login credentials. If so, the user is sent to the dashboard page.
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json("/dashboard");
  });

  // route for signins
  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      userName: req.body.userName
    }).then(function() {
      res.redirect(307, "/api/login");
    }).catch(function(err) {
      console.log(err);
      res.json(err);
    });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // sends back empty object if no one is logged in
      res.json({});
    }
    else {
      // sends back info on who just logged in
      res.json({
        email: req.user.email,
        id: req.user.id,
        name: req.user.name,
        userName: req.user.userName
      });
    }
  });

};