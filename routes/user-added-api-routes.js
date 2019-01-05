var db = require("../models");

module.exports = function (app) {

    // GET REQUESTS FOR USER-ADDED CONTENT
    // route to user added albums
    app.get("/music/addedalbums", function (req, res) {
        // query database to find all the added albums by loged in user
        db.AlbumAdded.findAll({
            where: {
                user_id: req.user.id,
                nextup: false,
                completed: false,
                remove: false
            },
            // takes me to wherever the album add list will be
        }).then(function (data) {
            var hbsObject = {
                albums: data
            };
            res.render("music-added", hbsObject)
        })
    });

    // route to user added albums
    app.get("/movies/addedmovies", function (req, res) {
        // query database to find all the added albums by loged in user
        db.MovieAdded.findAll({
            where: {
                user_id: req.user.id,
                nextup: false,
                completed: false,
                remove: false
            },
            // takes me to wherever the album add list will be
        }).then(function (data) {
            var hbsObject = {
                title: data
            };
            res.render("movies-added", hbsObject)
        })
    });

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
            // takes me to wherever the album add list will be
        }).then(function (data) {
            var hbsObject = {
                title: data
            };
            res.render("books-added", hbsObject)
        })
    });

    // POST REQUSTS TO ADD USER ITEM===========================================
    // add an album to AlbumAdded
    app.post("/music/addedalbums", function (req, res) {

        console.log(req.body.user_id)
        console.log(req.body.album);
        console.log(req.body.artist);
        console.log(req.body.year);

        db.AlbumAdded.create({
            user_id: req.body.user_id,
            album: req.body.album,
            artist: req.body.artist,
            year: req.body.year
        }).then(function () {
            res.end();
        })
    });

    // add a movie to MovieAdded
    app.post("/movies/addedmovies", function (req, res) {

        console.log(req.body.user_id)
        console.log(req.body.title);
        console.log(req.body.rating);
        console.log(req.body.year);

        db.MovieAdded.create({
            user_id: req.body.user_id,
            title: req.body.title,
            rating: req.body.rating,
            year: req.body.year
        }).then(function () {
            res.end();
        })
    });

    // add a book to BookAdded
    app.post("/books/addedbooks", function (req, res) {

        console.log(req.body.user_id)
        console.log(req.body.title);
        console.log(req.body.author);

        db.BookAdded.create({
            user_id: req.body.user_id,
            title: req.body.title,
            author: req.body.author
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