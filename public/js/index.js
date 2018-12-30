$(document).ready(function () {

  // Variable to save userID;
  var userID;

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
  
  // CLICK FUNCTIONS FOR DATABASE SELECTION=======================================
  // View Remaining
  $("#view-all").on("click", function(event) {
    event.preventDefault();
    // Collapse intro text and change dropdown text to display choice 
    $("#db-list").text("View Remaining");
    $("#db-explanation").collapse();

  })
  
  // NextUp
  $("#next-up").on("click", function(event) {
    event.preventDefault();
    // Collapse intro text and change dropdown text to display choice 
    $("#db-list").text("NextUp");
    $("#db-explanation").collapse();
  })
  
  // Listened to
  $("#listened-to").on("click", function(event) {
    event.preventDefault();
    // Collapse intro text and change dropdown text to display choice 
    $("#db-list").text("Listened To");
    $("#db-explanation").collapse();
  })
  
  // Full database
  $("#full-db").on("click", function(event) {
    event.preventDefault();
    // Collapse intro text and change dropdown text to display choice 
    $("#db-list").text("Full Database");
    $("#db-explanation").collapse();
  })

  // CLICK FUNCTIONS FOR USER-DB INTERACTION===========================================
  // NEXTUP BUTTON
  $(".btn-nextup").on("click", function(event) {
    event.preventDefault();
    // Grab id and save to variable
    var albumID = $(this).attr("id");

    // Create object to send to database with nextup = true
    var nextupObj = {
      user_id: userID,
      AlbumId: albumID,
      nextup: true
    }    

    // Send post request with new object to update user-album DB
    $.post("/api/music/nextup", nextupObj
    ).then(function(data) {
      console.log(data);
      // If there's an error, log the error
    }).catch(function(err) {
      console.log(err);
    });
  })    

  // SHOW MORE BUTTON
  $("#more").on("click", function(event) {
    event.preventDefault();
    // Increase counter by 50
    counter += 50;
    // Create counter object to send
    var counterObj = {
      counter: counter
    }
   
    // Send get request with counter to show more entries
    $.post("/api/music/more", counterObj
    ).then(function(data) {
      console.log(data);
      // location.reload();
      // If there's an error, log the error
    }).catch(function(err) {
      console.log(err);
    });
  })


// SAMPLE HELP FROM CLASS=======DELETE EVENTUALLY=======================================

// Get references to page elements
// var $exampleText = $("#example-text");
// var $exampleDescription = $("#example-description");
// var $submitBtn = $("#submit");
// var $exampleList = $("#example-list");

// // The API object contains methods for each kind of request we'll make
// var API = {
//   saveExample: function(example) {
//     return $.ajax({
//       headers: {
//         "Content-Type": "application/json"
//       },
//       type: "POST",
//       url: "api/examples",
//       data: JSON.stringify(example)
//     });
//   },
//   getExamples: function() {
//     return $.ajax({
//       url: "api/examples",
//       type: "GET"
//     });
//   },
//   deleteExample: function(id) {
//     return $.ajax({
//       url: "api/examples/" + id,
//       type: "DELETE"
//     });
//   }
// };

// // refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function() {
//   API.getExamples().then(function(data) {
//     var $examples = data.map(function(example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// // handleFormSubmit is called whenever we submit a new example
// // Save the new example to the db and refresh the list
// var handleFormSubmit = function(event) {
//   event.preventDefault();

//   var example = {
//     text: $exampleText.val().trim(),
//     description: $exampleDescription.val().trim()
//   };

//   if (!(example.text && example.description)) {
//     alert("You must enter an example text and description!");
//     return;
//   }

//   API.saveExample(example).then(function() {
//     refreshExamples();
//   });

//   $exampleText.val("");
//   $exampleDescription.val("");
// };

// // handleDeleteBtnClick is called when an example's delete button is clicked
// // Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function() {
//     refreshExamples();
//   });
// };

// // Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);

})