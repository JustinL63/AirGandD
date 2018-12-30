var db = require("../models");

module.exports = function(app) {

// GET REQUESTS
// Request to show next 50 items in music database - STILL NEED TO GET THIS DISPLAYED ON THE PAGE

app.post("/api/music/more", function(req, res) {
  var counterID = parseInt(req.body.counter); 
  console.log(counterID);
  db.Album.findAll({ offset: counterID, limit: 50 })
  .then(function(data) {
    var hbsObject = {
      albums: data
    };
    console.log(hbsObject);
    res.render("music", hbsObject);
    });
});

// app.get("/api/music/remaining", function(req, res) {
//   db.Post.findAll({
//     //function to get all information where a user has not interacted with the data.
//   })
//     .then(function(dbPost) {
//       res.json(dbPost);
//     });
// });

// // app.get("/api/music/nextup", function(req, res) {
// //   db.Post.findAll({
// //     //function to get all the albums the user has marked as interested in.
// //   })
// //     .then(function(dbPost) {
// //       res.json(dbPost);
// //     });
// // });

// app.get("/api/music/listened", function(req, res) {
//   db.Post.findAll({
//     //function to get all the music the user has marked as listen to.
//   })
//     .then(function(dbPost) {
//       res.json(dbPost);
//     });
// });

// app.get("/api/music/all", function(req, res) {
//   db.Post.findAll({
//     //function to get all of the music from the original music list, does not require user input
//   })
//     .then(function(dbPost) {
//       res.json(dbPost);
//     });
// });

// app.get("/api/films/remaining", function(req, res) {
//   db.Post.findAll({
//     //function to get all information where a user has not interacted with the data.
//   })
//     .then(function(dbPost) {
//       res.json(dbPost);
//     });
// });

// app.get("/api/films/nextup", function(req, res) {
//   db.Post.findAll({
//     //function to get all the movies the user has marked as interested in.
//   })
//     .then(function(dbPost) {
//       res.json(dbPost);
//     });
// });

// app.get("/api/films/listened", function(req, res) {
//   db.Post.findAll({
//     //function to get all the movies the user has marked as listen to.
//   })
//     .then(function(dbPost) {
//       res.json(dbPost);
//     });
// });

// app.get("/api/films/nextup", function(req, res) {
//   db.Post.findAll({
//     //function to get all the movies the user has marked as interested in.
//   })
//     .then(function(dbPost) {
//       res.json(dbPost);
//     });
// });app.get("/api/films/all", function(req, res) {
//   db.Post.findAll({
//     //function to get all of the movies from the original music list, does not require user input
//   })
//     .then(function(dbPost) {
//       res.json(dbPost);
//     });
// });

// app.get("/api/books/remaining", function(req, res) {
//   db.Post.findAll({
//     //function to get all information where a user has not interacted with the data.
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

// app.get("/api/books/listened", function(req, res) {
//   db.Post.findAll({
//     //function to get all the music the user has marked as listen to.
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
// });app.get("/api/books/all", function(req, res) {
//   db.Post.findAll({
//     //function to get all of the music from the original music list, does not require user input
//   })
//     .then(function(dbPost) {
//       res.json(dbPost);
//     });
// });

// POST REQUESTS

// User marks album for NextUp
app.post("/api/music/nextup", function(req, res) {
  console.log(req.body);
  db.UserAlbum.create({
    user_id: req.body.user_id,
    nextup: req.body.nextup,
    AlbumId: req.body.AlbumId
  }).then(function(dbCreate) {
      res.json(dbCreate);
    });
  })

}

