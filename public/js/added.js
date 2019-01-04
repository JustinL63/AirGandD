$(document).ready(function() {

$("#btn-album").on("click", function(event){
    event.preventDefault();
    var addedAlbum = $("#albumTitle");
    var addedArtist = $("#albumArtist");
    var addedYear = $("#albumYear");
        var musicAdded = {
            album: addedAlbum.val().trim(),
            artist: addedArtist.val().trim(),
            year: addedYear.val().trim()
        }
        console.log(musicAdded)
    if (!musicAdded.album){
        document.getElementById("notFilledOut").innerHTML = "Please fill out all forms"
        return;
        }
        addAlbum(musicAdded.album, musicAdded.artist, musicAdded.year);
        addedAlbum.val("");
        addedArtist.val("");
        addedYear.val("");

        function addAlbum(album, artist, year){
            $.post("/music/addedalbums",{
                album: album,
                artist: artist,
                year: year
            }).catch(function(err){
                console.log(err);
            })
        }
        
    });
});