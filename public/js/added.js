$(document).ready(function () {

    // GLOBAL VARIABLE
    // Variable to save userID
    var userID;

    // Get request to grab userID
    $.get("/api/user_data").then(function (data) {
        userID = data.id;
    })

    $("#btn-album").on("click", function (event) {
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
        if (!musicAdded.album) {
            document.getElementById("notFilledOut").innerHTML = "Please fill out all forms"
            return;
        }

        addAlbum(musicAdded.album, musicAdded.artist, musicAdded.year);
        addedAlbum.val("");
        addedArtist.val("");
        addedYear.val("");

        $("#btn-album").modal("hide");

        function addAlbum(album, artist, year) {
            $.post("/music/addedalbums", {
                user_id: userID,
                album: album,
                artist: artist,
                year: year
            }).catch(function (err) {
                console.log(err);
            })
        }
    });

    $("#btn-movie").on("click", function (event) {
        event.preventDefault();
        var addedMovie = $("#movieTitle");
        var addedYear = $("#movieYear");
        var addedRating = $("#movieRating");
        
        var movieAdded = {
            title: addedMovie.val().trim(),
            year: addedYear.val().trim(),
            rating: addedRating.val().trim(),
        }

        console.log(movieAdded)
        if (!movieAdded.title) {
            document.getElementById("notFilledOut").innerHTML = "Please fill out all forms"
            return;
        }

        addMovie(movieAdded.title, movieAdded.year, movieAdded.rating);
        addedMovie.val("");
        addedYear.val("");
        addedRating.val("");

        $("#btn-movie").modal("hide");

        function addMovie(title, year, rating) {
            $.post("/movies/addedMovies", {
                user_id: userID,
                title: title,
                year: year,
                rating: rating
            }).catch(function (err) {
                console.log(err);
            })
        }
    });

    $("#btn-book").on("click", function (event) {
        event.preventDefault();
        var addedTitle = $("#bookTitle");
        var addedAuthor = $("#bookAuthor");
        
        var bookAdded = {
            title: addedTitle.val().trim(),
            author: addedAuthor.val().trim(),
        }

        console.log(bookAdded)
        if (!bookAdded.title) {
            document.getElementById("notFilledOut").innerHTML = "Please fill out all forms"
            return;
        }

        addBook(bookAdded.title, bookAdded.author);
        addedTitle.val("");
        addedAuthor.val("");

        $("#btn-book").modal("hide");

        function addBook(title, author) {
            $.post("/books/addedBooks", {
                user_id: userID,
                title: title,
                author: author
            }).catch(function (err) {
                console.log(err);
            })
        }
    });
});