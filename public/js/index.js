$(document).ready(function () {
  // GLOBAL VARIABLES=========================================
  // Variable to save userID;
  var userID;

  //Get status of user  
  $.get("/api/user_data").then(function (data) {
    if (data.id) {
      // Change navbar text to Log Out and point to logout page
      $("#login-status").text("Log Out");
      $("#login-status").attr("href", "/logout");
      
      // Show navbar buttons
      $(".user-link").show();

      // Save user id to variable
      userID = data.id;

    } else {
      // If user logs out, change text to Log In, point to login page, hide navbar options
      $("#login-status").text("Log In");
      $("#login-status").attr("href", "/login");
    }
  });

  // CLICK FUNCTIONS TO CHOOSE DATABASE VIEW=======================================
  // Remaining List  
  $("#view-all").on("click", function (event) {
    event.preventDefault();

    // Retrieve page section info 
    var pageID = $("body").attr("data-content");

    // Run switch statement to determine which page to go to. HTML route runs the db query on page load
    switch (pageID) {
      case "music":
        window.location.href = "/music";
        break;

      case "movies":
        window.location.href = "/movies";
        break;

      case "books":
        window.location.href = "/books";
        break;

      default:
        console.log("Something is wrong.")
    }
  })

  // NextUp
  $("#next-up").on("click", function (event) {
    event.preventDefault();
    // Retrieve page section info 
    var pageID = $("body").attr("data-content");

    // Run switch statement to determine correct get request
    switch (pageID) {
      case "music":
        $.get("/music/nextup", function (data) {
          window.location.href = "/music/nextup";
        })
        break;

      case "movies":
        $.get("/movies/nextup", function (data) {
          window.location.href = "/movies/nextup";
        })
        break;

      case "books":
        $.get("/books/nextup", function (data) {
          window.location.href = "/books/nextup";
        })
        break;

      default:
        console.log("Something is wrong.")
    }
  })

  // Listened To
  $("#listened-to").on("click", function (event) {
    event.preventDefault();

    // Retrieve page section info 
    var pageID = $("body").attr("data-content");

    // Run switch statement to determine correct get request
    switch (pageID) {
      case "music":
        $.get("/music/completed", function (data) {
          window.location.href = "/music/completed";
        })
        break;

      case "movies":
        $.get("/movies/completed", function (data) {
          window.location.href = "/movies/completed";
        })
        break;

      case "books":
        $.get("/books/completed", function (data) {
          window.location.href = "/books/completed";
        })
        break;

      default:
        console.log("Something is wrong.")
    }
  })

  // Full database
  $("#full-db").on("click", function (event) {
    event.preventDefault();

    // Retrieve page section info 
    var pageID = $("body").attr("data-content");

    // Run switch statement to determine correct get request
    switch (pageID) {
      case "music":
        $.get("/music/full", function (data) {
          window.location.href = "/music/full";
        })
        break;

      case "movies":
        $.get("/movies/full", function (data) {
          window.location.href = "/movies/full";
        })
        break;

      case "books":
        $.get("/books/full", function (data) {
          window.location.href = "/books/full";
        })
        break;

      default:
        console.log("Something is wrong.")
    }
  })

  // User added
  $("#added").on("click", function (event) {
    event.preventDefault();

    // Retrieve page section info 
    var pageID = $("body").attr("data-content");

    // Run switch statement to determine correct get request
    switch (pageID) {
      case "music":
        $.get("/music/addedAlbums", function (data) {
          window.location.href = "/music/addedAlbums";
        })
        break;

      case "movies":
        $.get("/movies/addedMovies", function (data) {
          window.location.href = "/movies/addedMovies";
        })
        break;

      case "books":
        $.get("/books/addedBooks", function (data) {
          window.location.href = "/books/addedBooks";
        })
        break;

      default:
        console.log("Something is wrong.")
    }
  })

  // REFRESH - To update list on Remaining view  
  $("#refresh").on("click", function (event) {
    event.preventDefault();
    
    // Retrieve page section info
    var pageID = $("body").attr("data-content");

    // Run switch statement to determine correct get request
    switch (pageID) {
      // Goes directly to page. HTML route runs the db query on page load
      case "music":
        window.location.href = "/music";
        break;

      case "movies":
        window.location.href = "/movies";
        break;

      case "books":
        window.location.href = "/books";
        break;

      default:
        console.log("Something is wrong.")
    }
  })


  // SIDEBAR - refresh
  $("#side-refresh").on("click", function (event) {
    event.preventDefault();
    location.reload();
  })
  // ================================================================================

  // CLICK FUNCTIONS FOR USER-DB INTERACTION======================
  // Function to run when any db-interaction button is clicked
  function initialAction(nextupval, completedval, removedval, query) {

    // Create object to send to database with 
    var Obj = {
      user_id: userID,
      item: itemID,
      nextup: nextupval,
      completed: completedval,
      remove: removedval
    }

    // Send post request with new object to update user-album/music/movies DB
    $.post(query, Obj
    ).then(function (data) {
      console.log(data);
      // If there's an error, log the error
    }).catch(function (err) {
      console.log(err);
    });
  }

  // NEXTUP BUTTON
  $(".btn-nextup").on("click", function (event) {
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
        initialAction(true, false, false, "/music/nextup");
        break;

      case "movies":
        initialAction(true, false, false, "/movies/nextup");
        break;

      case "books":
        initialAction(true, false, false, "/books/nextup");
        break;

      default:
        console.log("Something is wrong.")
    }
  })

  // LISTENED TO BUTTON
  $(".btn-completed").on("click", function (event) {
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
        initialAction(false, true, false, "/music/completed");
        break;

      case "movies":
        initialAction(false, true, false, "/movies/completed");
        break;

      case "books":
        initialAction(false, true, false, "/books/completed");
        break;

      default:
        console.log("Something is wrong.")
    }
  })

  // REMOVE BUTTON
  $(".btn-remove").on("click", function (event) {
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
        initialAction(false, false, true, "/music/remove");
        break;

      case "movies":
        initialAction(false, false, true, "/movies/remove");
        break;

      case "books":
        initialAction(false, false, true, "/books/remove");
        break;

      default:
        console.log("Something is wrong.")
    }
  })
  // ===========================================================================

  // AMAZON BUTTON LINKS========================================================
  // MUSIC LINKS
  $(".btn-amazon-music").on("click", function(){
    var amazon = "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Dpopular&field-keywords=";
    var dataAlbum = $(this).attr("data-album");
    var alter = dataAlbum.replace(/[^A-Z0-9]+/ig, "+");
    var dataArtist = $(this).attr("data-artist")
    var alterArtist = dataArtist.replace(/[^A-Z0-9]+/ig, "+");
    var search = amazon+alter+"+"+alterArtist;
    window.open(search, "_blank")
  });

  // MOVIE LINKS
  $(".btn-amazon-movies").on("click", function(){
    var amazon = "https://www.amazon.com/s/ref=nb_sb_noss_1?url=search-alias%3Dmovies-tv&field-keywords=";
    var dataMovie = $(this).attr("data-movie");
    var alter = dataMovie.replace(/[^A-Z0-9]+/ig, "+");
    var search = amazon+alter;
    window.open(search, "_blank")
  });

  // BOOK LINKS
  $(".btn-amazon-books").on("click", function(){
    var amazon = "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Dstripbooks&field-keywords=";
    var dataBooks = $(this).attr("data-books");
    var alter = dataBooks.replace(/[^A-Z0-9]+/ig, "+");
    var dataAuthor = $(this).attr("data-author");
    var authorAlter = dataAuthor.replace(/[^A-Z0-9]+/ig, "+");
    var search = amazon+alter+"+"+authorAlter;
    window.open(search, "_blank")
  })
  

  // SEARCH BAR FUNCTIONS ON FULL DB VIEW =======================================
  // MUSIC SEARCH
  $("#artistNameSearchFilter").keyup(function () {
    var input = document.getElementById("artistNameSearchFilter");
    var string = input.value;
    var filter = string.toLowerCase();
    var tr = document.getElementsByTagName("tr")
    for (var i = 0; i < tr.length; i++) {
      var td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        var txtValue = td.textContent || td.innerText;
        console.log("this is the txtValue " + txtValue)
        if (txtValue.toLowerCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  })

  // on click that switches over to the artist search bar
  $("#artistNameButton").on("click", function(event){
    event.preventDefault();
    $("#artistNameSearchFilter").show();
    $("#albumNameSearchFilter").hide();
    $("#yearSearchFilter").hide();
    $(".musicSearchBar").val("")
  })

  // album search bar
  $("#albumNameSearchFilter").hide();
  $("#albumNameSearchFilter").keyup(function () {
    var input = document.getElementById("albumNameSearchFilter");
    var string = input.value;
    var filter = string.toLowerCase();
    var tr = document.getElementsByTagName("tr")
    for (var i = 0; i < tr.length; i++) {
      var td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        var txtValue = td.textContent || td.innerText;
        console.log("this is the txtValue " + txtValue)
        if (txtValue.toLowerCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  })

  // on click that switchs over to album search bar
  $("#albumNameButton").on("click", function(event){
    event.preventDefault();
    $("#albumNameSearchFilter").show();
    $("#artistNameSearchFilter").hide();
    $("#yearSearchFilter").hide();
    $(".musicSearchBar").val("")
  })

  // year search bar
  $("#yearSearchFilter").hide();
  $("#yearSearchFilter").keyup(function () {
    var input = document.getElementById("yearSearchFilter");
    var string = input.value;
    var filter = string.toLowerCase();
    var tr = document.getElementsByTagName("tr")
    for (var i = 0; i < tr.length; i++) {
      var td = tr[i].getElementsByTagName("td")[2];
      if (td) {
        var txtValue = td.textContent || td.innerText;
        console.log("this is the txtValue " + txtValue)
        if (txtValue.toLowerCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  })

  // on click that switched over to the year search bar
  $("#yearButton").on("click", function(event){
    event.preventDefault();
    $("#yearSearchFilter").show();
    $("#albumNameSearchFilter").hide();
    $("#artistNameSearchFilter").hide();
    $(".musicSearchBar").val("")
  })

  // MOVIE SEARCH
  $("#movieTitleSearchFilter").keyup(function () {
    var input = document.getElementById("movieTitleSearchFilter");
    var string = input.value;
    var filter = string.toLowerCase();
    var tr = document.getElementsByTagName("tr")
    console.log("this is var input " + input)
    console.log("this is what happens after you run var input through var filter " + filter)
    console.log("this is what happens when I do input.value " + string)
    for (var i = 0; i < tr.length; i++) {
      var td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        var txtValue = td.textContent || td.innerText;
        console.log("this is the txtValue " + txtValue)
        if (txtValue.toLowerCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  });

  // on click that switches to author search bar
  $("#authorSearchButton").on("click", function(event){
    event.preventDefault();
    $("#authorSearchFilter").show();
    $("#bookTitleSearchFilter").hide();
    console.log("author search")
  })

  // on click that switches to book title search bar
  $("#bookTitleSearchButton").on("click", function(event){
    event.preventDefault();
    $("#bookTitleSearchFilter").show();
    $("#authorSearchFilter").hide();
    console.log("book title search")
  })


  // BOOK SEARCH
  // search by author
  $("#authorSearchFilter").keyup(function () {
    var input = document.getElementById("authorSearchFilter");
    var string = input.value;
    var filter = string.toLowerCase();
    var tr = document.getElementsByTagName("tr")
    console.log("this is var input " + input)
    console.log("this is what happens after you run var input through var filter " + filter)
    console.log("this is what happens when I do input.value " + string)
    for (var i = 0; i < tr.length; i++) {
      var td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        var txtValue = td.textContent || td.innerText;
        console.log("this is the txtValue " + txtValue)
        if (txtValue.toLowerCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  });

  // Book title Search
  $("#bookTitleSearchFilter").hide();
  $("#bookTitleSearchFilter").keyup(function () {
    var input = document.getElementById("bookTitleSearchFilter");
    var string = input.value;
    var filter = string.toLowerCase();
    var tr = document.getElementsByTagName("tr")
    console.log("this is var input " + input)
    console.log("this is what happens after you run var input through var filter " + filter)
    console.log("this is what happens when I do input.value " + string)
    for (var i = 0; i < tr.length; i++) {
      var td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        var txtValue = td.textContent || td.innerText;
        console.log("this is the txtValue " + txtValue)
        if (txtValue.toLowerCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  });
})