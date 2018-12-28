var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
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
  app.get("/dashboard", function (req, res) {
    res.render("dashboard", {

    })
  });
  // Route to generic music page
  app.get("/music", function (req, res) {
    res.render("music", {
      //Needs to show next 3 items in the NextUp database
    })
  });
  // Route to generic movies page
  app.get("/movies", function (req, res) {
    res.render("movies", {
      //Needs to show next 3 items in the NextUp database
    })
  });
  // Route to generic books page
  app.get("/books", function (req, res) {
    res.render("books", {
      //Needs to show next 3 items in the NextUp database
    })
  });
  app.get("/dashboard", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.render("dashboard", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/music", function (req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function (dbExample) {
      res.render("music", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
