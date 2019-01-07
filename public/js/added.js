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
        var radioChecked = $("input:checked").val();
        
        // Set nextup, finished values based on radioChecked
        if (radioChecked === "nextUp") {
            nextUpVal = true;
            finishedVal = false;
        } else if (radioChecked === "finished") {
            nextUpVal = false;
            finishedVal = true;
        } else {
            nextUpVal = false;
            finishedVal = false;
        }

        var musicAdded = {
            album: addedAlbum.val().trim(),
            artist: addedArtist.val().trim(),
            year: addedYear.val().trim(),
            nextup: nextUpVal,
            completed: finishedVal
        }
        if (!musicAdded.album) {
            document.getElementById("notFilledOut").innerHTML = "Please fill out all forms"
            return;
        }

        addAlbum(musicAdded.album, musicAdded.artist, musicAdded.year, musicAdded.nextup, musicAdded.completed);
        addedAlbum.val("");
        addedArtist.val("");
        addedYear.val("");
        $("input[name='addRadio']").prop("checked", false);
        

        $("#btn-album").modal("hide");

        function addAlbum(album, artist, year, nextup, completed) {
            $.post("/music/addedalbums", {
                user_id: userID,
                album: album,
                artist: artist,
                year: year,
                nextup: nextup,
                completed: completed
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
        var radioChecked = $("input:checked").val();
        
        // Set nextup, finished values based on radioChecked
        if (radioChecked === "nextUp") {
            nextUpVal = true;
            finishedVal = false;
        } else if (radioChecked === "finished") {
            nextUpVal = false;
            finishedVal = true;
        } else {
            nextUpVal = false;
            finishedVal = false;
        }

        var movieAdded = {
            title: addedMovie.val().trim(),
            year: addedYear.val().trim(),
            rating: addedRating.val().trim(),
            nextup: nextUpVal,
            completed: finishedVal
        }

        if (!movieAdded.title) {
            document.getElementById("notFilledOut").innerHTML = "Please fill out all forms"
            return;
        }

        addMovie(movieAdded.title, movieAdded.year, movieAdded.rating, movieAdded.nextup, movieAdded.completed);
        addedMovie.val("");
        addedYear.val("");
        addedRating.val("");
        $("input[name='addRadio']").prop("checked", false);

        $("#btn-movie").modal("hide");

        function addMovie(title, year, rating, nextup, completed) {
            $.post("/movies/addedmovies", {
                user_id: userID,
                title: title,
                year: year,
                rating: rating,
                nextup: nextup,
                completed: completed
            }).catch(function (err) {
                console.log(err);
            })
        }
    });

    $("#btn-book").on("click", function (event) {
        event.preventDefault();
        var addedTitle = $("#bookTitle");
        var addedAuthor = $("#bookAuthor");
        var radioChecked = $("input:checked").val();
        
        // Set nextup, finished values based on radioChecked
        if (radioChecked === "nextUp") {
            nextUpVal = true;
            finishedVal = false;
        } else if (radioChecked === "finished") {
            nextUpVal = false;
            finishedVal = true;
        } else {
            nextUpVal = false;
            finishedVal = false;
        }

        var bookAdded = {
            title: addedTitle.val().trim(),
            author: addedAuthor.val().trim(),
            nextup: nextUpVal,
            completed: finishedVal
        }

        if (!bookAdded.title) {
            document.getElementById("notFilledOut").innerHTML = "Please fill out all forms"
            return;
        }

        addBook(bookAdded.title, bookAdded.author, bookAdded.nextup, bookAdded.completed);
        addedTitle.val("");
        addedAuthor.val("");
        $("input[name='addRadio']").prop("checked", false);


        $("#btn-book").modal("hide");

        function addBook(title, author, nextup, completed) {
            $.post("/books/addedbooks", {
                user_id: userID,
                title: title,
                author: author,
                nextup: nextup,
                completed: completed
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
                window.location.href = "/404"        
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
                window.location.href = "/404"
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
                window.location.href = "/404"
        }
    })
});