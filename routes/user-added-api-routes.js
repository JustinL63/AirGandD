var db = require("../models");

module.exports = function (app) {
    
    // add an album to AlbumAdded
    app.post("/music/addedAlbums",function(req, res){

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
    app.post("/movies/addedMovies",function(req, res){

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
    app.post("/books/addedBooks",function(req, res){

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
}