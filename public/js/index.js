$(document).ready(function () {
  // GLOBAL VARIABLES=========================================
  // Variable to save userID;
  var userID;

  $("#signUp").on("click")

  $.get("/api/user_data").then(function (data) {
    if (data.id) {
      // Change navbar text to Log Out and point to logout page
      $("#login-status").text("Log Out");
      $("#login-status").attr("href", "/logout");
      userID = data.id;

    } else {
      // If user logs out, change text to Log In and point to login page
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
        
        case "movie":
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
        $.get("/api/music/nextup", function (data) {
          window.location.href = "/api/music/nextup";
        })
        break;
      
        case "movie":
        $.get("/api/movies/nextup", function (data) {
          window.location.href = "/api/movies/nextup";
        })
        break;

        case "books":
        $.get("/api/books/nextup", function (data) {
          window.location.href = "/api/books/nextup";
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
        $.get("/api/music/completed", function (data) {
          window.location.href = "/api/music/completed";
        })
        break;
      
        case "movie":
        $.get("/api/movies/completed", function (data) {
          window.location.href = "/api/movies/completed";
        })
        break;

        case "books":
        $.get("/api/books/completed", function (data) {
          window.location.href = "/api/books/completed";
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
        $.get("/api/music/full", function (data) {
          window.location.href = "/api/music/full";
        })
        break;
      
        case "movie":
        $.get("/api/movies/full", function (data) {
          window.location.href = "/api/movies/full";
        })
        break;

        case "books":
        $.get("/api/books/full", function (data) {
          window.location.href = "/api/books/full";
        })
        break;

        default:
        console.log("Something is wrong.")
    }
  })
    
  // REFRESH - To update list on Remaining view  
  $("#refresh").on("click", function (event) {
    event.preventDefault();
    // Goes directly to "/music". HTML route runs the db query on page load
    window.location.href = "/music";
  });
// ================================================================================

  // CLICK FUNCTIONS FOR USER-DB INTERACTION IN VIEW REMAINING/FULL======================
  // Function to run when any db-interaction button is clicked the first time
  function initialAction(nextupval, completedval, removedval, query) {

    // Create object to send to database with 
    var Obj = {
      user_id: userID,
      item: itemID,
      nextup: nextupval,
      completed: completedval,
      remove: removedval
    }
    console.log(Obj);

    // Send post request with new object to update user-album DB
    $.post("/api/" + query, Obj
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
    
    // Fade row, then remove it from table display    
    $(this).closest("tr").fadeOut(500, function() {
      $(this).closest("tr").empty() 
    });

    // Grab data-page value
    var type = $(this).attr("data-page");

    // Run switch statement to determine which parameters to pass to initialAction function
    switch (type) {
      case "music":
        initialAction(true, false, false, "music/nextup");
        break;

      case "movie":
        console.log("Movie selected - code to come")
        break;

      case "books":
        console.log("Books selected - code to come")
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
    
    // Fade row, then remove it from table display    
    $(this).closest("tr").fadeOut(500, function() {
      $(this).closest("tr").empty() 
    });

    // Grab data-page value
    var type = $(this).attr("data-page");

    // Run switch statement to determine which parameters to pass to initialAction function and run function
    switch (type) {
      case "music":
        initialAction(false, true, false, "music/completed");
        break;

      case "movie":
        console.log("Movie selected - code to come")
        break;

      case "books":
        console.log("Books selected - code to come")
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
  
    // Fade row, then remove it from table display    
    $(this).closest("tr").fadeOut(500, function() {
      $(this).closest("tr").empty() 
    });

    // Grab data-page value
    var type = $(this).attr("data-page");

    // Run switch statement to determine which parameters to pass to initialAction function
    switch (type) {
      case "music":
        initialAction(false, false, true, "music/remove");
        break;

      case "movie":
        console.log("Movie selected - code to come")
        break;

      case "books":
        console.log("Books selected - code to come")
        break;

      default:
        console.log("Something is wrong.")
    }
  })
  // =========================================================================

  // CLICK FUNCTIONS FOR NEXTUP INTERACTION======================
  // Function to run when any button is clicked in NextUp queue
  function nextAction(completedval, removedval, query) {

    // Create object to send to database 
    var Obj = {
      user_id: userID,
      id: nextID,
      nextup: false,
      completed: completedval,
      remove: removedval
    }
    console.log(Obj);

    // Send put request to update user-album DB
    $.ajax({
      method: "PUT",
      url: "/api/" + query,
      data: Obj
    }).then(function (data) {
      console.log(data);
      // If there's an error, log the error
    }).catch(function (err) {
      console.log(err);
    });
  }  

  // LISTENED TO BUTTON
  $(".btn-nx-completed").on("click", function (event) {
    event.preventDefault();

    // Grab ID of NextUp record
    nextID = $(this).attr("id");

    // Check to see if button is pressed from main view or sidebar
    if ($(this).attr("data-site")) {
      // If data-site is found, that means it's located in the sidebar and the .item div should be hidden
      $(this).closest(".item").fadeOut();
  
    } else
      // It's in the main view and the buttons should be removed
      $(this).closest('td').empty();

    // Grab data-page value
    var type = $(this).attr("data-page");

    // Run switch statement to determine which parameters to pass to initialAction function and run function
    switch (type) {
      case "music":
        nextAction(true, false, "music/completed");
        break;

      case "movie":
        console.log("Movie selected - code to come")
        break;

      case "books":
        console.log("Books selected - code to come")
        break;

      default:
        console.log("Something is wrong.")
    }
  })

  // REMOVE BUTTON
  $(".btn-nx-remove").on("click", function (event) {
    event.preventDefault();

    // Grab ID of NextUp record
    nextID = $(this).attr("id");
    // Remove row from album table display
    $(this).closest('td').empty();

    // Check to see if button is pressed from main view or sidebar
    if ($(this).attr("data-site")) {
      // If data-site is found, that means it's located in the sidebar and the .item div should be hidden
      $(this).closest(".item").fadeOut();
  
    } else
      // It's in the main view and the buttons should be removed
      $(this).closest('td').empty();
    
    // Grab data-page value
    var type = $(this).attr("data-page");

    // Run switch statement to determine which parameters to pass to initialAction function and run function
    switch (type) {
      case "music":
        nextAction(false, true, "music/remove");
        break;

      case "movie":
        console.log("Movie selected - code to come")
        break;

      case "books":
        console.log("Books selected - code to come")
        break;

      default:
        console.log("Something is wrong.")
    }
  })
});