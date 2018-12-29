var db = require("../models");

// Requiring middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  
  // Load index page
  app.get("/", function (req, res) {
    res.render("index");
  });
  
  // Route to generic login page
  app.get("/login", function (req, res) {
    res.render("login", {
    })
  });

  // Route to generic create page
  app.get("/create", function (req, res) {
    res.render("create", {

    })
  });
  // Route to generic dashboard page
  app.get("/dashboard", isAuthenticated, function (req, res) {
    res.render("dashboard", {

    })
  });
  // Route to generic music page
  app.get("/music", isAuthenticated, function (req, res) {
    res.render("music", {
    })
  });
  // Route to generic movies page
  app.get("/film", isAuthenticated, function (req, res) {
    res.render("film", {
    })
  });
  // Route to generic books page
  app.get("/books", isAuthenticated, function (req, res) {
    res.render("books", {
    })
  });
  // app.get("/dashboard", isAuthenticated, function (req, res) {
  //   db.Users.findAll({}).then(function (dbUsers) {
  //     res.render("dashboard", {
  //       msg: "Welcome!",
  //       examples: dbUsers
  //     });
  //   });
  // });

  // Load example page and pass in an example by id
  // app.get("/music", function (req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function (dbExample) {
  //     res.render("music", {
  //       example: dbExample
  //     });
  //   });
  // });

  // Render 404 page for any unmatched routes
  // app.get("*", function (req, res) {
  //   res.render("404");
  // });
};