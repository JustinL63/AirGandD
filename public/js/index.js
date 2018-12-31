$(document).ready(function () {
  // GLOBAL VARIABLES
  // Variable to save userID;
  var userID;
  // Variable to save albumID;
  var albumID;
  // Variable to save counter used in Show More button
  var counter = 0;

  // Check to see if user is logged in
  $.get("/api/user_data").then(function(data) {
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
  $("#view-all").on("click", function(event) {
    event.preventDefault();
    // Goes directly to "/music". HTML route runs the db query
    window.location.href = "/music"; 
  });
  
  // MUSIC - NextUp
  $("#next-up").on("click", function(event) {
    event.preventDefault();

    // Send get request for music already marked NextUp by user
    $.get("/api/music/nextup", function(data) {
      window.location.href = "/api/music/nextup";
    })
  });
  
  // MUSIC - Listened To
  $("#listened-to").on("click", function(event) {
    event.preventDefault();
    
    // Send get request for music already marked Listened To by user
    $.get("/api/music/completed", function(data) {
      window.location.href = "/api/music/completed";
    })
  });
  
  // MUSIC - Full database
  $("#full-db").on("click", function(event) {
    event.preventDefault();

    // Send get request for music already marked Listened To by user
    $.get("/api/music/full", function(data) {
    window.location.href = "/api/music/full";
    })
  });

  // CLICK FUNCTIONS FOR USER-DB INTERACTION IN MAIN SECTION=============================
  // Function to run when any db-interaction button is clicked the first time
  function initialAction(nextupval, completedval, removedval, query) {    
  
    // Create object to send to database with 
    var albumObj = {
      user_id: userID,
      AlbumId: albumID,
      nextup: nextupval,
      completed: completedval,
      remove: removedval
    }
      console.log(albumObj);
  
    // Send post request with new object to update user-album DB
    $.post("/api/music/" + query, albumObj
    ).then(function(data) {
      console.log(data);
      // If there's an error, log the error
    }).catch(function(err) {
      console.log(err);
    });
  }

  // NEXTUP BUTTON
  $(".btn-nextup").on("click", function(event) {
    event.preventDefault();

    // Grab album ID
    albumID = $(this).attr("id");

    // Shade row and remove buttons from table display    
    $(this).closest("td").empty();
    
    // Run intial action function, passing correct values and post URL
    initialAction(true, false, false, "nextup");
  }) 
  
  // LISTENED TO BUTTON
  $(".btn-completed").on("click", function(event) {
    event.preventDefault();

    // Grab album ID
    albumID = $(this).attr("id");

    // Remove row from album table display
    $(this).closest('td').empty();
    
    // Run intial action function, passing correct values and post URL
    initialAction(false, true, false, "completed");
  }) 

  // REMOVE BUTTON
  $(".btn-remove").on("click", function(event) {
    event.preventDefault();

    // Grab album ID
    albumID = $(this).attr("id");

    // Remove row from album table display
    $(this).closest('td').empty();
  
    // Run intial action function, passing correct values and post URL
    initialAction(false, false, true, "remove");
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