var db = require("../models");

// console.log(userID);

module.exports = function (app) {

  // GET REQUESTS=================================================================
  // MUSIC - NEXTUP
  app.get("/api/music/nextup", function (req, res) {     
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
  app.get("/api/music/completed", function (req, res) {
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
        res.render("music-completed", hbsObject)
      });
    });
  });

  // MUSIC - FULL DB
  app.get("/api/music/full", function (req, res) {
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

  // app.get("/api/movies/nextup", function(req, res) {
  //   db.Post.findAll({
  //     //function to get all the movies the user has marked as interested in.
  //   })
  //     .then(function(dbPost) {
  //       res.json(dbPost);
  //     });
  // });

  // app.get("/api/movies/completed", function(req, res) {
  //   db.Post.findAll({
  //     //function to get all the movies the user has marked as listen to.
  //   })
  //     .then(function(dbPost) {
  //       res.json(dbPost);
  //     });
  // });

  // });app.get("/api/movies/full", function(req, res) {
  //   db.Post.findAll({
  //     //function to get all of the movies from the original music list, does not require user input
  //   })
  //     .then(function(dbPost) {
  //       res.json(dbPost);
  //     });
  // });

  // app.get("/api/books/nextup", function(req, res) {
  //   db.Post.findAll({
  //     //function to get all the albums the user has marked as interested in.
  //   })
  //     .then(function(dbPost) {
  //       res.json(dbPost);
  //     });
  // });

  // app.get("/api/books/completed", function(req, res) {
  //   db.Post.findAll({
  //     //function to get all the music the user has marked as listen to.
  //   })
  //     .then(function(dbPost) {
  //       res.json(dbPost);
  //     });
  // });

  // app.get("/api/books/full", function(req, res) {
  //   db.Post.findAll({
  //     //function to get all the albums the user has marked as interested in.
  //   })
  //     .then(function(dbPost) {
  //       res.json(dbPost);
  //     });

  // =================================================================================

  // POST REQUESTS==================================================================
  // INITIAL INTERACTION WITH DATABASE
  // MUSIC - User marks album for NextUp
  app.post("/api/music/nextup", function (req, res) {
    db.UserAlbum.create(req.body)
      .then(function (dbCreate) {
        res.json(dbCreate);
      });
  });

  // MUSIC - User marks album as Listened To/Completed
  app.post("/api/music/completed", function (req, res) {
    db.UserAlbum.create(req.body)
      .then(function (dbCreate) {
        res.json(dbCreate);
      });
  })

  // MUSIC - User removes album
  app.post("/api/music/remove", function (req, res) {
    db.UserAlbum.create(req.body)
      .then(function (dbCreate) {
        res.json(dbCreate);
      });
  })

  // =========================================================================


  // PUT REQUESTS - updates to NextUp list====================================
  // MUSIC - User marks NextUp album as Listened To/Completed
  app.put("/api/music/completed", function (req, res) {
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

  // MUSIC - User marks NextUp album as Listened To/Completed
  app.put("/api/music/remove", function (req, res) {
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
}
