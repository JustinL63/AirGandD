$(document).ready(function () {
    // GLOBAL VARIABLE
    // Variable to save userID
    var userID;

    // Get request to grab userID
    $.get("/api/user_data").then(function (data) {
        userID = data.id;
    })

    // CLICK FUNCTIONS WHEN NEW ITEM SUBMITTED=================================
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
            $.post("/movies/addedmovies", {
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
            $.post("/books/addedbooks", {
                user_id: userID,
                title: title,
                author: author
            }).catch(function (err) {
                console.log(err);
            })
        }
    });
    // ========================================================================

    // CLICK FUNCTIONS FOR BUTTONS FOR ADDED ITEMS
    // Function to run when any db-interaction button is clicked
    function addedAction(nextupval, completedval, removedval, query) {

        // Create object to send to database with 
        var Obj = {
            user_id: userID,
            id: itemID,
            nextup: nextupval,
            completed: completedval,
            remove: removedval
        }

        // Send post request to update user-added album/music/movies DB
        $.post(query, Obj
        ).then(function (data) {
            console.log(data);
            // If there's an error, log the error
        }).catch(function (err) {
            console.log(err);
        });
    }

    // NEXTUP BUTTON
    $(".btn-nextup-add").on("click", function (event) {
        event.preventDefault();

        // Grab item ID
        itemID = $(this).attr("id");

        // Check to see where button was pressed
        if ($(this).attr("data-site")) {
            // If data-site is found, that means it's located in the sidebar/dashboard and the .item div should be hidden
            $(this).closest(".item").fadeOut();

        } else {
            // It's in the main view and the table row should be removed
            $(this).closest("tr").fadeOut(500, function () {
                $(this).closest("tr").empty();
            });
        }

        // Grab data-page value
        var type = $(this).attr("data-page");

        // Run switch statement to determine which parameters to pass to initialAction function
        switch (type) {
            case "music":
                addedAction(true, false, false, "/music/addedalbums/update");
                break;

            case "movies":
                addedAction(true, false, false, "/movies/addedmovies/update");
                break;

            case "books":
                addedAction(true, false, false, "/books/addedbooks/update");
                break;

            default:
                console.log("Something is wrong.")
        }
    })

    // LISTENED TO BUTTON
    $(".btn-completed-add").on("click", function (event) {
        event.preventDefault();

        // Grab item ID
        itemID = $(this).attr("id");

        // Check to see where button was pressed
        if ($(this).attr("data-site")) {
            // If data-site is found, that means it's located in the sidebar/dashboard and the .item div should be hidden
            $(this).closest(".item").fadeOut();

        } else {
            // It's in the main view and the table row should be removed
            $(this).closest("tr").fadeOut(500, function () {
                $(this).closest("tr").empty();
            });
        }

        // Grab data-page value
        var type = $(this).attr("data-page");

        // Run switch statement to determine which parameters to pass to initialAction function and run function
        switch (type) {
            case "music":
                addedAction(false, true, false, "/music/addedalbums/update");
                break;

            case "movies":
                addedAction(false, true, false, "/movies/addedmovies/update");
                break;

            case "books":
                addedAction(false, true, false, "/books/addedbooks/update");
                break;

            default:
                console.log("Something is wrong.")
        }
    })

    // REMOVE BUTTON
    $(".btn-remove-add").on("click", function (event) {
        event.preventDefault();

        // Grab item ID
        itemID = $(this).attr("id");

        // Check to see where button was pressed
        if ($(this).attr("data-site")) {
            // If data-site is found, that means it's located in the sidebar/dashboard and the .item div should be hidden
            $(this).closest(".item").fadeOut();

        } else {
            // It's in the main view and the table row should be removed
            $(this).closest("tr").fadeOut(500, function () {
                $(this).closest("tr").empty();
            });
        }

        // Grab data-page value
        var type = $(this).attr("data-page");

        // Run switch statement to determine which parameters to pass to initialAction function
        switch (type) {
            case "music":
                addedAction(false, false, true, "/music/addedalbums/update");
                break;

            case "movies":
                addedAction(false, false, true, "/movies/addedmovies/update");
                break;

            case "books":
                addedAction(false, false, true, "/books/addedbooks/update");
                break;

            default:
                console.log("Something is wrong.")
        }
    })
    // ===========================================================================
});