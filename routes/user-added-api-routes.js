var db = require("../models");

module.exports = function(app) {
    app.get("/music/addedalbums", function(req, res){
        // query database to find all the added albums by loged in user
        db.AlbumAdded.findAll({
            where:{
                user_id: req.user.id
            },
        }).then(function (data) {
            var hbsObject = {
              albums: data
            };
            res.render("placeholder", hbsObject)
        })
    });

    // query database for all added albums
    app.get("/music/addedalbums/all", function(req,res){
        db.AlbumAdded.findAll({})
        .then(function (data){
            var hbsObject = {
                albums:data
            };
            res.render("placeholder", hbsObject)
        })
    });

    // add an album to AddedAlbums
    app.post("/music/addedalbums/post", function(req, res){
        db.AlbumAdded.create(req.body).then(function(dbAlbumAdded){
            res.json(dbAlbumAdded)
        })
    });
}