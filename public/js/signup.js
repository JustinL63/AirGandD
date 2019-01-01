$(document).ready(function() {
    // Create variables to hold form data
    var emailInput = $("#emailInput");
    var passwordInput = $("#passwordInput");
    var nameInput = $("#nameInput");
    var userNameInput = $("#userNameInput");
  
    // When submit button is clicked...
    $("#create").on("click", function(event) {
      event.preventDefault();

      // Grab values from form and store in userData object
      var userData = {
        email: emailInput.val().trim(),
        password: passwordInput.val().trim(),
        name: nameInput.val().trim(),
        userName: userNameInput.val()
      };

      // Check to make sure all form fields have been filled out
      if (!userData.email || !userData.password || !userData.name || !userData.userName) {
        alert("please fill out all forms");
        return;
      }
      // Once all fields have been filled (and all values are unique), the form is emptied
      signUpUser(userData.email, userData.password, userData.name, userData.userName);
      emailInput.val("");
      passwordInput.val("");
      nameInput.val("");
      userNameInput.val("")
    });
  
    // Posts user info to the signup info api
    function signUpUser(email, password, name, userName) {
      $.post("/api/signup", {
        email: email,
        password: password,
        name: name,
        userName: userName
      }).then(function(data) {
        window.location.replace(data)
        // throws error
      }).catch(logInErr);

      function logInErr(err){
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
      }
    }
  });