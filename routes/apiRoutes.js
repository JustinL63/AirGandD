var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
// Get all data from users database
app.get("/user db location", function(req, res) {
  db.Post.findAll({})
    .then(function(userDB) {
      res.json(userDB);
    });
});

app.get("/api/music/remaining", function(req, res) {
  db.Post.findAll({
    //function to get all information where a user has not interacted with the data.
  })
    .then(function(dbPost) {
      res.json(dbPost);
    });
});

app.get("/api/music/nextup", function(req, res) {
  db.Post.findAll({
    //function to get all the albums the user has marked as interested in.
  })
    .then(function(dbPost) {
      res.json(dbPost);
    });
});

app.get("/api/music/listened", function(req, res) {
  db.Post.findAll({
    //function to get all the music the user has marked as listen to.
  })
    .then(function(dbPost) {
      res.json(dbPost);
    });
});

app.get("/api/music/nextup", function(req, res) {
  db.Post.findAll({
    //function to get all the albums the user has marked as interested in.
  })
    .then(function(dbPost) {
      res.json(dbPost);
    });
});app.get("/api/music/all", function(req, res) {
  db.Post.findAll({
    //function to get all of the music from the original music list, does not require user input
  })
    .then(function(dbPost) {
      res.json(dbPost);
    });
});

app.get("/api/films/remaining", function(req, res) {
  db.Post.findAll({
    //function to get all information where a user has not interacted with the data.
  })
    .then(function(dbPost) {
      res.json(dbPost);
    });
});

app.get("/api/films/nextup", function(req, res) {
  db.Post.findAll({
    //function to get all the movies the user has marked as interested in.
  })
    .then(function(dbPost) {
      res.json(dbPost);
    });
});

app.get("/api/films/listened", function(req, res) {
  db.Post.findAll({
    //function to get all the movies the user has marked as listen to.
  })
    .then(function(dbPost) {
      res.json(dbPost);
    });
});

app.get("/api/films/nextup", function(req, res) {
  db.Post.findAll({
    //function to get all the movies the user has marked as interested in.
  })
    .then(function(dbPost) {
      res.json(dbPost);
    });
});app.get("/api/films/all", function(req, res) {
  db.Post.findAll({
    //function to get all of the movies from the original music list, does not require user input
  })
    .then(function(dbPost) {
      res.json(dbPost);
    });
});

app.get("/api/books/remaining", function(req, res) {
  db.Post.findAll({
    //function to get all information where a user has not interacted with the data.
  })
    .then(function(dbPost) {
      res.json(dbPost);
    });
});

app.get("/api/books/nextup", function(req, res) {
  db.Post.findAll({
    //function to get all the albums the user has marked as interested in.
  })
    .then(function(dbPost) {
      res.json(dbPost);
    });
});

app.get("/api/books/listened", function(req, res) {
  db.Post.findAll({
    //function to get all the music the user has marked as listen to.
  })
    .then(function(dbPost) {
      res.json(dbPost);
    });
});

app.get("/api/books/nextup", function(req, res) {
  db.Post.findAll({
    //function to get all the albums the user has marked as interested in.
  })
    .then(function(dbPost) {
      res.json(dbPost);
    });
});app.get("/api/books/all", function(req, res) {
  db.Post.findAll({
    //function to get all of the music from the original music list, does not require user input
  })
    .then(function(dbPost) {
      res.json(dbPost);
    });
});


