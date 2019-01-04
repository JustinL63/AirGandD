var db = require("../models");

module.exports = function (app) {
    // app.get("/music/addedalbums", function(req, res){
    //     // query database to find all the added albums by loged in user
    //     db.AlbumAdded.findAll({
    //         where:{
    //             user_id: req.user.id
    //         },
    //         // takes me to wherever the album add list will be
    //     }).then(function (data) {
    //         var hbsObject = {
    //           albums: data
    //         };
    //         res.render("placeholder", hbsObject)
    //     })
    // });

    // // query database for all added albums
    // app.get("/music/addedalbums/all", function(req,res){
    //     db.AlbumAdded.findAll({})
    //     .then(function (data){
    //         var hbsObject = {
    //             albums:data
    //         };
    //         res.render("placeholder", hbsObject)
    //     })
    // });

    // add an album to AddedAlbums
    app.post("/music/addedalbums",function(req, res){

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
}