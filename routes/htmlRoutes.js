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
    // Query for NextUp albums - next 5 from provided list
    db.UserAlbum.findAll({
      limit: 5,
      where: {
        user_id: req.user.id,
        nextup: true
      },
      include: [db.Album]
    })
      // Query for NextUp albums - up to next 5 from user-added
      .then(function (data1) {
        db.AlbumAdded.findAll({
          limit: 5 - data1.length,
          where: {
            user_id: req.user.id,
            nextup: true
          }
        }).then(function (data2) {
          // Query for NextUp movies - next 5 from provided list
          db.UserMovies.findAll({
            limit: 5,
            where: {
              user_id: req.user.id,
              nextup: true
            },
            include: [db.Movies]
            // Query for NextUp movies - up to next 5 from user-added
          }).then(function (data3) {
            db.MovieAdded.findAll({
              limit: 5 - data1.length,
              where: {
                user_id: req.user.id,
                nextup: true
              }
            }).then(function (data4) {

              // Query for NextUp books - next 5 from provided list
              db.UserBooks.findAll({
                limit: 5,
                where: {
                  user_id: req.user.id,
                  nextup: true
                },
                include: [db.Books]
                // Query for NextUp books - up to next 5 from user-added
              }).then(function (data5) {
                db.BookAdded.findAll({
                  limit: 5 - data1.length,
                  where: {
                    user_id: req.user.id,
                    nextup: true
                  }
                }).then(function (data6) {

                  // Save object with data from all three queries
                  var hbsObject = {
                    albums: data1,
                    albumsAdd: data2,
                    movies: data3,
                    moviesAdd: data4,
                    books: data5,
                    booksAdd: data6
                  };
                  res.render("dashboard", hbsObject)
                })
              });
            });
          });
        })
      });
  });

  // Route to music page. Shows Remaining songs and NextUp dashboard on the sidebar.
  app.get("/music", isAuthenticated, function (req, res) {
    // Set array variable to hold matches returned from useralbum query
    var matches = [];

    // Query to search useralbum and bring back items user has marked in list 
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
            // Query for NextUp sidebar, using list items, limit of 5
            db.UserAlbum.findAll({
              limit: 5,
              where: {
                user_id: req.user.id,
                nextup: true
              },
              include: [db.Album]
            }).then(function (data3) {
              // Store number of records in a variable
              var records = data3.length;

              // Check to see if records returned is 5 or more
              if (records >= 5) {
                // If 5 are returned, render page and send object
                var hbsObject = {
                  albums: data2,
                  dashboard: data3
                };
                res.render("music/music", hbsObject)

              } else {
                // If less than 5, query db for items from user-added nextup, equaling up to 5
                db.AlbumAdded.findAll({
                  limit: (5 - records),
                  where: {
                    user_id: req.user.id,
                    nextup: true
                  }
                }).then(function (data4) {
                  var hbsObject = {
                    albums: data2,
                    dashboard: data3,
                    dashAdd: data4
                  };
                  res.render("music/music", hbsObject)
                });
              }
            });
          });

          // If user does not have any entries in useralbum
        } else {
          // Query albums database, retrieve first 50
          db.Album.findAll({
            limit: 50
          }
          ).then(function (data2) {
            var hbsObject = {
              albums: data2
            };
            res.render("music/music", hbsObject)
          });
        }
      });
  });

  // Route to generic movies page
  app.get("/movies", isAuthenticated, function (req, res) {
    // Set array variable to hold matches returned from usermovie query
    var matches = [];

    // Query to search usermovie and bring back items that user marked on list 
    db.UserMovies.findAll({
      where: {
        user_id: req.user.id
      }
    })
      .then(function (data1) {
        // If user has entries in usermovie...
        if (data1.length > 0) {
          for (let i = 0; i < data1.length; i++) {
            matches.push(data1[i].item)
          }
          // Query movies database, where movie id does not match array items
          db.Movies.findAll({
            limit: 50,
            where: {
              id: { [Op.notIn]: matches }
            }
          }).then(function (data2) {
            // Query for NextUp sidebar
            // First grab up to five entries from provided list
            db.UserMovies.findAll({
              limit: 5,
              where: {
                user_id: req.user.id,
                nextup: true
              },
              include: [db.Movies]
            }).then(function (data3) {
              // Store number of records in a variable
              var records = data3.length;

              // Check to see if records returned is 5 or more
              if (records >= 5) {
                // If 5 are returned, render page and send object
                var hbsObject = {
                  movies: data2,
                  dashboard: data3
                };
                res.render("movies/movies", hbsObject)

              } else {
                // If less than 5, query db for items from user-added nextup, equaling up to 5
                db.MovieAdded.findAll({
                  limit: (5 - records),
                  where: {
                    user_id: req.user.id,
                    nextup: true
                  }
                }).then(function (data4) {
                  var hbsObject = {
                    movies: data2,
                    dashboard: data3,
                    dashAdd: data4
                  };
                  res.render("movies/movies", hbsObject)
                });
              }
            });
          });

          // If user does not have any entries in usermovies
        } else {
          // Query movies database, bring back first 50
          db.Movies.findAll({
            limit: 50
          }
          ).then(function (data2) {
            var hbsObject = {
              movies: data2,
            };
            res.render("movies/movies", hbsObject)
          });
        }
      });
  });

  // Route to generic books page
  app.get("/books", isAuthenticated, function (req, res) {
    // Set array variable to hold matches returned from userbooks query
    var matches = [];

    // Query to search userbooks and bring back items that user is associated 
    db.UserBooks.findAll({
      where: {
        user_id: req.user.id
      }
    })
      .then(function (data1) {
        // If user has entries in userbooks...
        if (data1.length > 0) {
          for (let i = 0; i < data1.length; i++) {
            matches.push(data1[i].item)
          }
          // Query books database, where book id does not match array items
          db.Books.findAll({
            limit: 50,
            where: {
              id: { [Op.notIn]: matches }
            }
          }).then(function (data2) {
            // Query for NextUp sidebar
            // First grab up to five entries from provided list
            db.UserBooks.findAll({
              limit: 5,
              where: {
                user_id: req.user.id,
                nextup: true
              },
              include: [db.Books]
            }).then(function (data3) {
              // Store number of records in a variable
              var records = data3.length;

              // Check to see if records returned is 5 or more
              if (records >= 5) {
                // If 5 are returned, render page and send object
                var hbsObject = {
                  books: data2,
                  dashboard: data3
                };
                res.render("books/books", hbsObject)

              } else {
                // If less than 5, query db for items from user-added nextup, equaling up to 5
                db.BookAdded.findAll({
                  limit: (5 - records),
                  where: {
                    user_id: req.user.id,
                    nextup: true
                  }
                }).then(function (data4) {
                  var hbsObject = {
                    books: data2,
                    dashboard: data3,
                    dashAdd: data4
                  };
                  res.render("books/books", hbsObject)
                });
              }
            });
          });

          // If user does not have any entries in userbooks
        } else {
          // Query books database, bring back first 50
          db.Books.findAll({
            limit: 50
          }
          ).then(function (data2) {
            var hbsObject = {
              books: data2,
            };
            res.render("books/books", hbsObject)
          });
        }
      });
  });
};