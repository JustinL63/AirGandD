var db = require("../models");

// console.log(userID);

module.exports = function (app) {

  // GET REQUESTS=================================================================
  // MUSIC - NEXTUP
  app.get("/music/nextup", function (req, res) {
    // Query database to find all albums that the user marked for NextUp
    db.UserAlbum.findAll({
      where: {
        user_id: req.user.id,
        nextup: true
      },
      include: [db.Album]
    })
      .then(function (data) {
        var hbsObject = {
          albums: data
        };
        res.render("music-nextup", hbsObject)
      })
  });

  // MUSIC - LISTENED
  app.get("/music/completed", function (req, res) {
    // Query database for all albums that user has listened to
    db.UserAlbum.findAll({
      where: {
        user_id: req.user.id,
        completed: true
      },
      include: [db.Album]
    })
      .then(function (data1) {
        // Query for NextUp sidebar
        db.UserAlbum.findAll({
          limit: 5,
          where: {
            user_id: req.user.id,
            nextup: true
          },
          include: [db.Album]
        }).then(function (data2) {
          var hbsObject = {
            albums: data1,
            dashboard: data2
          };
          res.render("music-completed", hbsObject);
        });
      });
  });

  // MUSIC - FULL DB
  app.get("/music/full", function (req, res) {
    // Query for full database
    db.Album.findAll({})
      .then(function (data1) {
        // Query for NextUp sidebar
        db.UserAlbum.findAll({
          limit: 5,
          where: {
            user_id: req.user.id,
            nextup: true
          },
          include: [db.Album]
        }).then(function (data2) {
          var hbsObject = {
            albums: data1,
            dashboard: data2
          };
          res.render("music-full", hbsObject);
        });
      });
  });

  // MOVIES - NEXTUP
  app.get("/movies/nextup", function (req, res) {
    // Query database to find all movies that the user marked for NextUp
    console.log("Movies is hit");
    db.UserMovies.findAll({
      where: {
        user_id: req.user.id,
        nextup: true
      },
      include: [db.Movies]
    })
      .then(function (data) {
        var hbsObject = {
          movies: data
        };
        res.render("movies-nextup", hbsObject)
      })
  });

  // MOVIES - LISTENED
  app.get("/movies/completed", function (req, res) {
    // Query database for all movies that user has listened to
    db.UserMovies.findAll({
      where: {
        user_id: req.user.id,
        completed: true
      },
      include: [db.Movies]
    })
      .then(function (data1) {
        // Query for NextUp sidebar
        db.UserMovies.findAll({
          limit: 5,
          where: {
            user_id: req.user.id,
            nextup: true
          },
          include: [db.Movies]
        }).then(function (data2) {
          var hbsObject = {
            movies: data1,
            dashboard: data2
          };
          res.render("movies-completed", hbsObject)
        });
      });
  });

  // MOVIES - FULL DB
  app.get("/movies/full", function (req, res) {
    // Query for full database
    db.Movies.findAll({})
      .then(function (data1) {
        // Query for NextUp sidebar
        db.UserMovies.findAll({
          limit: 5,
          where: {
            user_id: req.user.id,
            nextup: true
          },
          include: [db.Movies]
        }).then(function (data2) {
          var hbsObject = {
            movies: data1,
            dashboard: data2
          };
          res.render("movies-full", hbsObject);
        });
      });
  });

  // BOOKS - NEXTUP
  app.get("/books/nextup", function (req, res) {
    // Query database to find all movies that the user marked for NextUp
    db.UserBooks.findAll({
      where: {
        user_id: req.user.id,
        nextup: true
      },
      include: [db.Books]
    })
      .then(function (data) {
        var hbsObject = {
          books: data
        };
        res.render("books-nextup", hbsObject)
      })
  });

  // BOOKS - LISTENED
  app.get("/books/completed", function (req, res) {
    // Query database for all movies that user has listened to
    db.UserBooks.findAll({
      where: {
        user_id: req.user.id,
        completed: true
      },
      include: [db.Books]
    })
      .then(function (data1) {
        // Query for NextUp sidebar
        db.UserBooks.findAll({
          limit: 5,
          where: {
            user_id: req.user.id,
            nextup: true
          },
          include: [db.Books]
        }).then(function (data2) {
          var hbsObject = {
            books: data1,
            dashboard: data2
          };
          res.render("books-completed", hbsObject)
        });
      });
  });

  // BOOKS - FULL DB
  app.get("/books/full", function (req, res) {
    // Query for full database
    db.Books.findAll({})
      .then(function (data1) {
        // Query for NextUp sidebar
        db.UserBooks.findAll({
          limit: 5,
          where: {
            user_id: req.user.id,
            nextup: true
          },
          include: [db.Books]
        }).then(function (data2) {
          var hbsObject = {
            books: data1,
            dashboard: data2
          };
          res.render("books-full", hbsObject);
        });
      });
  });
  // =================================================================================

  // POST REQUESTS==================================================================
  // INITIAL INTERACTION WITH DATABASE
  // MUSIC - User marks album for NextUp
  app.post("/music/nextup", function (req, res) {
    db.UserAlbum.create(req.body)
      .then(function (dbCreate) {
        res.json(dbCreate);
      });
  });

  // MUSIC - User marks album as Listened To/Completed
  app.post("/music/completed", function (req, res) {
    db.UserAlbum.create(req.body)
      .then(function (dbCreate) {
        res.json(dbCreate);
      });
  })

  // MUSIC - User removes album
  app.post("/music/remove", function (req, res) {
    db.UserAlbum.create(req.body)
      .then(function (dbCreate) {
        res.json(dbCreate);
      });
  })

  // MOVIES - User marks movie for NextUp
  app.post("/movies/nextup", function (req, res) {
    db.UserMovies.create(req.body)
      .then(function (dbCreate) {
        res.json(dbCreate);
      });
  });

  // MOVIES - User marks movie as Listened To/Completed
  app.post("/movies/completed", function (req, res) {
    db.UserMovies.create(req.body)
      .then(function (dbCreate) {
        res.json(dbCreate);
      });
  })

  // MOVIE - User removes movie
  app.post("/movies/remove", function (req, res) {
    db.UserMovies.create(req.body)
      .then(function (dbCreate) {
        res.json(dbCreate);
      });
  })

  // BOOKS - User marks books for NextUp
  app.post("/books/nextup", function (req, res) {
    db.UserBooks.create(req.body)
      .then(function (dbCreate) {
        res.json(dbCreate);
      });
  });

  // BOOKS - User marks books as Read/Completed
  app.post("/books/completed", function (req, res) {
    db.UserBooks.create(req.body)
      .then(function (dbCreate) {
        res.json(dbCreate);
      });
  })

  // BOOKS - User removes book
  app.post("/books/remove", function (req, res) {
    db.UserBooks.create(req.body)
      .then(function (dbCreate) {
        res.json(dbCreate);
      });
  })

  // =========================================================================


  // PUT REQUESTS - updates to NextUp list====================================
  // MUSIC - User marks NextUp album as Listened To/Completed
  app.put("/music/completed", function (req, res) {
    db.UserAlbum.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      })
      .then(function (dbUpdate) {
        res.json(dbUpdate);
      });
  })

  // MUSIC - User marks NextUp album as Remove
  app.put("/music/remove", function (req, res) {
    db.UserAlbum.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      })
      .then(function (dbUpdate) {
        res.json(dbUpdate);
      });
  })

  // MOVIE - User marks NextUp movie as Listened To/Completed
  app.put("/movies/completed", function (req, res) {
    db.UserMovies.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      })
      .then(function (dbUpdate) {
        res.json(dbUpdate);
      });
  })

  // MOVIE - User marks NextUp movie as Listened To/Completed
  app.put("/movies/remove", function (req, res) {
    db.UserMovies.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      })
      .then(function (dbUpdate) {
        res.json(dbUpdate);
      });
  })

  // BOOKS - User marks NextUp book as Read
  app.put("/books/completed", function (req, res) {
    db.UserBooks.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      })
      .then(function (dbUpdate) {
        res.json(dbUpdate);
      });
  })

  // BOOKS - User marks NextUp books as Read
  app.put("/books/remove", function (req, res) {
    db.UserBooks.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      })
      .then(function (dbUpdate) {
        res.json(dbUpdate);
      });
  })
}
