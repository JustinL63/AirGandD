var db = require("../models");

module.exports = function (app) {

    // GET REQUESTS FOR USER-ADDED CONTENT
    // route to user added albums
    app.get("/music/addedalbums", function (req, res) {
        // query database to find all the added albums by logged in user
        db.AlbumAdded.findAll({
            where: {
                user_id: req.user.id,
                nextup: false,
                completed: false,
                remove: false
            },
        }).then(function (data1) {
            // Query for NextUp sidebar
            db.UserAlbum.findAll({
                limit: 5,
                where: {
                    user_id: req.user.id,
                    nextup: true
                },
                include: [db.Album]
            }).then(function (data2) {
                // Store number of records in a variable
                var records = data2.length;

                // Check to see if records returned is 5 or more
                if (records >= 5) {
                    // If 5 are returned, render page and send object
                    var hbsObject = {
                        albums: data1,
                        dashboard: data2
                    };
                    res.render("music/music-added", hbsObject)

                } else {
                    // If less than 5, query db for items from user-added nextup, equaling up to 5
                    db.AlbumAdded.findAll({
                        limit: (5 - records),
                        where: {
                            user_id: req.user.id,
                            nextup: true
                        }
                    }).then(function (data3) {
                        var hbsObject = {
                            albums: data1,
                            dashboard: data2,
                            dashAdd: data3
                        };
                        res.render("music/music-added", hbsObject)
                    });
                }
            });
        });
    });

    // route to user added albums
    app.get("/movies/addedmovies", function (req, res) {
        // query database to find all the added albums by logged in user
        db.MovieAdded.findAll({
            where: {
                user_id: req.user.id,
                nextup: false,
                completed: false,
                remove: false
            },
        }).then(function (data1) {
            console.log(data1)
            // Query for NextUp sidebar
            db.UserMovies.findAll({
                limit: 5,
                where: {
                    user_id: req.user.id,
                    nextup: true
                },
                include: [db.Movies]
            }).then(function (data2) {
                // Store number of records in a variable
                var records = data2.length;

                // Check to see if records returned is 5 or more
                if (records >= 5) {
                    // If 5 are returned, render page and send object
                    var hbsObject = {
                        movies: data1,
                        dashboard: data2
                    };
                    res.render("movies/movies-added", hbsObject)

                } else {
                    // If less than 5, query db for items from user-added nextup, equaling up to 5
                    db.MovieAdded.findAll({
                        limit: (5 - records),
                        where: {
                            user_id: req.user.id,
                            nextup: true
                        }
                    }).then(function (data3) {
                        var hbsObject = {
                            movies: data1,
                            dashboard: data2,
                            dashAdd: data3
                        };
                        res.render("movies/movies-added", hbsObject)
                    });
                }
            });
        });
    })

    // route to user added albums
    app.get("/books/addedbooks", function (req, res) {
        // query database to find all the added albums by loged in user
        db.BookAdded.findAll({
            where: {
                user_id: req.user.id,
                nextup: false,
                completed: false,
                remove: false
            },
        }).then(function (data1) {
            // Query for NextUp sidebar
            db.UserBooks.findAll({
                limit: 5,
                where: {
                    user_id: req.user.id,
                    nextup: true
                },
                include: [db.Books]
            }).then(function (data2) {
                // Store number of records in a variable
                var records = data2.length;

                // Check to see if records returned is 5 or more
                if (records >= 5) {
                    // If 5 are returned, render page and send object
                    var hbsObject = {
                        books: data1,
                        dashboard: data2
                    };
                    res.render("books/books-added", hbsObject)

                } else {
                    // If less than 5, query db for items from user-added nextup, equaling up to 5
                    db.BookAdded.findAll({
                        limit: (5 - records),
                        where: {
                            user_id: req.user.id,
                            nextup: true
                        }
                    }).then(function (data3) {
                        var hbsObject = {
                            books: data1,
                            dashboard: data2,
                            dashAdd: data3
                        };
                        res.render("books/books-added", hbsObject)
                    });
                }
            });
        });
    })

    // POST REQUSTS TO ADD USER ITEM===========================================
    // add an album to AlbumAdded
    app.post("/music/addedalbums", function (req, res) {

        db.AlbumAdded.create({
            user_id: req.body.user_id,
            album: req.body.album,
            artist: req.body.artist,
            year: req.body.year,
            nextup: req.body.nextup,
            completed: req.body.completed
        }).then(function () {
            res.end();
        })
    });

    // add a movie to MovieAdded
    app.post("/movies/addedmovies", function (req, res) {
        db.MovieAdded.create({
            user_id: req.body.user_id,
            title: req.body.title,
            rating: req.body.rating,
            year: req.body.year,
            nextup: req.body.nextup,
            completed: req.body.completed
        }).then(function () {
            res.end();
        })
    });

    // add a book to BookAdded
    app.post("/books/addedbooks", function (req, res) {
        db.BookAdded.create({
            user_id: req.body.user_id,
            title: req.body.title,
            author: req.body.author,
            nextup: req.body.nextup,
            completed: req.body.completed
        }).then(function () {
            res.end();
        })
    });
    // =====================================================================

    // POST REQUESTS TO UPDATE USER-ADDED ITEMS
    // Update user-added album with nextup, finished or removed values
    app.post("/music/addedalbums/update", function (req, res) {
        db.AlbumAdded.update(
            req.body,
            {
                where: {
                    id: req.body.id,
                    user_id: req.body.user_id
                }
            }
        ).then(function (dbCreate) {
            res.json(dbCreate);
        });
    })

    // Update user-added movie with nextup, finished or removed values
    app.post("/movies/addedmovies/update", function (req, res) {
        db.MovieAdded.update(
            req.body,
            {
                where: {
                    id: req.body.id,
                    user_id: req.body.user_id
                }
            }
        ).then(function (dbCreate) {
            res.json(dbCreate);
        });
    })

    // Update user-added books with nextup, finished or removed values
    app.post("/books/addedbooks/update", function (req, res) {
        db.BookAdded.update(
            req.body,
            {
                where: {
                    id: req.body.id,
                    user_id: req.body.user_id
                }
            }
        ).then(function (dbCreate) {
            res.json(dbCreate);
        });
    })
}