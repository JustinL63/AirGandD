var db = require("../models");

// Creating variable for Sequelize operators
var Sequelize = require("sequelize");
const Op = Sequelize.Op;

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
    // Query for NextUp albums - next 5
    db.UserAlbum.findAll({
      limit: 5,
      where: {
        user_id: req.user.id,
        nextup: true
      },
      include: [db.Album]
    })
      .then(function (data1) {

        // Query for NextUp movies - next 5 
        db.UserMovies.findAll({
          limit: 5,
          where: {
            user_id: req.user.id,
            nextup: true
          },
          include: [db.Movies]
        }).then(function (data2) {

          // Query for NextUp books - next 5 
          db.UserBooks.findAll({
            limit: 5,
            where: {
              user_id: req.user.id,
              nextup: true
            },
            include: [db.Books]
          }).then(function (data3) {

            // Save object with data from all three queries
            var hbsObject = {
              albums: data1,
              movies: data2,
              books: data3,
            };
            console.log(JSON.stringify(hbsObject));
            res.render("dashboard", hbsObject)
          })
        });
      });
  });

  // Route to music page. Shows Remaining songs and NextUp dashboard on the sidebar.
  app.get("/music", isAuthenticated, function (req, res) {
    // Set array variable to hold matches returned from useralbum query
    var matches = [];

    // Query to search useralbum and bring back items that user is associated 
    db.UserAlbum.findAll({
      where: {
        user_id: req.user.id
      }
    })
      .then(function (data1) {
        // If user has entries in useralbum...
        if (data1.length > 0) {
          for (let i = 0; i < data1.length; i++) {
            matches.push(data1[i].item)
          }
          // Query albums database, where album id does not match array items
          db.Album.findAll({
            limit: 50,
            where: {
              id: { [Op.notIn]: matches }
            }
          }).then(function (data2) {
            // Query for NextUp sidebar
            db.UserAlbum.findAll({
              limit: 5,
              where: {
                user_id: req.user.id,
                nextup: true
              },
              include: [db.Album]
            }).then(function (data3) {
              var hbsObject = {
                albums: data2,
                dashboard: data3
              };
              res.render("music", hbsObject)
            });
          });

          // If user does not have any entries in useralbum
        } else {
          // Query albums database, where album id does not match array items
          db.Album.findAll({
            limit: 50
          }
          ).then(function (data2) {
            // Query for NextUp sidebar
            db.UserAlbum.findAll({
              limit: 5,
              where: {
                user_id: req.user.id,
                nextup: true
              },
              include: [db.Album]
            }).then(function (data3) {
              var hbsObject = {
                albums: data2,
                dashboard: data3
              };
              res.render("music", hbsObject)
            });
          });
        }
      });
  });

  // Route to generic movies page
  app.get("/movies", isAuthenticated, function (req, res) {
    // Set array variable to hold matches returned from useralbum query
    var matches = [];

    // Query to search useralbum and bring back items that user is associated 
    db.UserMovies.findAll({
      where: {
        user_id: req.user.id
      }
    })
      .then(function (data1) {
        // If user has entries in useralbum...
        if (data1.length > 0) {
          for (let i = 0; i < data1.length; i++) {
            matches.push(data1[i].item)
          }
          // Query albums database, where album id does not match array items
          db.Movies.findAll({
            limit: 50,
            where: {
              id: { [Op.notIn]: matches }
            }
          }).then(function (data2) {
            // Query for NextUp sidebar
            db.UserMovies.findAll({
              limit: 5,
              where: {
                user_id: req.user.id,
                nextup: true
              },
              include: [db.Movies]
            }).then(function (data3) {
              var hbsObject = {
                movies: data2,
                dashboard: data3
              };
              res.render("movies", hbsObject)
            });
          });

          // If user does not have any entries in useralbum
        } else {
          // Query albums database, where album id does not match array items
          db.Movies.findAll({
            limit: 50
          }
          ).then(function (data2) {
            // Query for NextUp sidebar
            db.UserMovies.findAll({
              limit: 5,
              where: {
                user_id: req.user.id,
                nextup: true
              },
              include: [db.Movies]
            }).then(function (data3) {
              var hbsObject = {
                movies: data2,
                dashboard: data3
              };
              res.render("movies", hbsObject)
            });
          });
        }
      });
  });

  // Route to generic movies page
  app.get("/books", isAuthenticated, function (req, res) {
    // Set array variable to hold matches returned from useralbum query
    var matches = [];

    // Query to search useralbum and bring back items that user is associated 
    db.UserBooks.findAll({
      where: {
        user_id: req.user.id
      }
    })
      .then(function (data1) {
        // If user has entries in useralbum...
        if (data1.length > 0) {
          for (let i = 0; i < data1.length; i++) {
            matches.push(data1[i].item)
          }
          // Query albums database, where album id does not match array items
          db.Books.findAll({
            limit: 50,
            where: {
              id: { [Op.notIn]: matches }
            }
          }).then(function (data2) {
            // Query for NextUp sidebar
            db.UserBooks.findAll({
              limit: 5,
              where: {
                user_id: req.user.id,
                nextup: true
              },
              include: [db.Books]
            }).then(function (data3) {
              var hbsObject = {
                books: data2,
                dashboard: data3
              };
              res.render("books", hbsObject)
            });
          });

          // If user does not have any entries in useralbum
        } else {
          // Query albums database, where album id does not match array items
          db.Books.findAll({
            limit: 50
          }
          ).then(function (data2) {
            // Query for NextUp sidebar
            db.UserBooks.findAll({
              limit: 5,
              where: {
                user_id: req.user.id,
                nextup: true
              },
              include: [db.Books]
            }).then(function (data3) {
              var hbsObject = {
                books: data2,
                dashboard: data3
              };
              res.render("books", hbsObject)
            });
          });
        }
      });
  });
};