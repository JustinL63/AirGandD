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
    db.UserAlbum.findAll({ 
      limit: 5,
      where: {
        user_id: req.user.id,
        nextup: true 
      },
      include: [db.Album]
    })
    .then(function(data) {
      var hbsObject = {
        albums: data
      };
      console.log(JSON.stringify(hbsObject));
      res.render("dashboard", hbsObject) 
    })
  });
  // Route to generic music page. Right now it brings back the Full Database but would like this to display View Remaining when that gets figured out
  app.get("/music", isAuthenticated, function (req, res) {
    db.Album.findAll({ 
      limit: 50,

     })
    .then(function(data) {
      var hbsObject = {
        albums: data
      };
      res.render("music", hbsObject);
      });
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

  // Render 404 page for any unmatched routes
  // app.get("*", function (req, res) {
  //   res.render("404");
  // });
};