$(document).ready(function () {
  // GLOBAL VARIABLES
  // Variable to save userID;
  var userID;
  // Variable to save albumID;
  var albumID;
  // Variable to save counter used in Show More button
  // var counter = 0;

  // Check to see if user is logged in
  $.get("/api/user_data").then(function (data) {
    if (data.id) {
      $("#login-status").text("Log Out");
      $("#login-status").attr("href", "/logout");
      userID = data.id;

    } else {
      $("#login-status").text("Log In");
      $("#login-status").attr("href", "/login");
    }
  });

  // CLICK FUNCTIONS TO CHOOSE DATABASE=======================================
  // MUSIC - View Remaining
  $("#view-all").on("click", function (event) {
    event.preventDefault();
    // Goes directly to "/music". HTML route runs the db query
    window.location.href = "/music";
  });

  // MUSIC - NextUp
  $("#next-up").on("click", function (event) {
    event.preventDefault();

    // Send get request for music already marked NextUp by user
    $.get("/api/music/nextup", function (data) {
      window.location.href = "/api/music/nextup";
    })
  });

  // MUSIC - Listened To
  $("#listened-to").on("click", function (event) {
    event.preventDefault();

    // Send get request for music already marked Listened To by user
    $.get("/api/music/completed", function (data) {
      window.location.href = "/api/music/completed";
    })
  });

  // MUSIC - Full database
  $("#full-db").on("click", function (event) {
    event.preventDefault();

    // Send get request for music already marked Listened To by user
    $.get("/api/music/full", function (data) {
      window.location.href = "/api/music/full";
    })
  });
  // x
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

  // BUTTONS============================================================================
  // NEXTUP BUTTON
  $(".btn-nextup").on("click", function (event) {
    event.preventDefault();

    // Grab item ID
    itemID = $(this).attr("id");
    // Shade row and remove buttons from table display    
    $(this).closest("td").empty();

    // Grab data-page value
    var type = $(this).attr("data-page");

    // Run switch statement to determine which parameters to pass to initialAction function
    switch (type) {
      case "music":
        initialAction(true, false, false, "music/nextup");
        break;

      case "film":
        console.log("Film selected - code to come")
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
    // Remove row from album table display
    $(this).closest('td').empty();

    // Grab data-page value
    var type = $(this).attr("data-page");

    // Run switch statement to determine which parameters to pass to initialAction function and run function
    switch (type) {
      case "music":
        initialAction(false, true, false, "music/completed");
        break;

      case "film":
        console.log("Film selected - code to come")
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
    // Remove row from album table display
    $(this).closest('td').empty();

    // Grab data-page value
    var type = $(this).attr("data-page");

    // Run switch statement to determine which parameters to pass to initialAction function
    switch (type) {
      case "music":
        initialAction(false, false, true, "music/remove");
        break;

      case "film":
        console.log("Film selected - code to come")
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
    // Remove row from album table display
    $(this).closest('td').empty();

    // Grab data-page value
    var type = $(this).attr("data-page");

    // Run switch statement to determine which parameters to pass to initialAction function and run function
    switch (type) {
      case "music":
        nextAction(true, false, "music/completed");
        break;

      case "film":
        console.log("Film selected - code to come")
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

    // Grab data-page value
    var type = $(this).attr("data-page");

    // Run switch statement to determine which parameters to pass to initialAction function and run function
    switch (type) {
      case "music":
        nextAction(false, true, "music/remove");
        break;

      case "film":
        console.log("Film selected - code to come")
        break;

      case "books":
        console.log("Books selected - code to come")
        break;

      default:
        console.log("Something is wrong.")
    }
  })














  // SHOW MORE BUTTON
  // $("#more").on("click", function(event) {
  //   event.preventDefault();
  //   // Increase counter by 50
  //   counter += 50;
  //   // Create counter object to send
  //   var counterObj = {
  //     counter: counter
  //   }

  //   // Send get request with counter to show more entries
  //   $.post("/api/music/more", counterObj
  //   ).then(function(data) {
  //     console.log(data);
  //     // location.reload();
  //     // If there's an error, log the error
  //   }).catch(function(err) {
  //     console.log(err);
  //   });
  // })
})