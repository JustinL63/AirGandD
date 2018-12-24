var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });
  
  // Load login page
  app.get("/login", function(req, res) {
    res.render("login");
  });
  
  // Load create page
  app.get("/create", function(req, res) {
    res.render("create");
  });

  // Load dashboard page and data
  app.get("/dashboard", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("dashboard", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load music page (initial visit, no data) 
  app.get("/music", function(req, res) {
    res.render("music");
  });



  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};