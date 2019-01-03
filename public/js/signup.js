$(document).ready(function () {
  // Create variables to hold form data
  var emailInput = $("#emailInput");
  var passwordInput = $("#passwordInput");
  var nameInput = $("#nameInput");
  var userNameInput = $("#userNameInput");

  // When submit button is clicked...
  $("#create").on("click", function (event) {
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
      document.getElementById("notFilled").innerHTML = "Please fill out all forms"
      return;
    }

    // Once all fields have been filled (and email and user name values are unique), the form is emptied
    signUpUser(userData);
    emailInput.val("");
    passwordInput.val("");
    nameInput.val("");
    userNameInput.val("")

    function signUpUser(userData){
    $.post("/api/signup", userData
      ).then(function (data) {
        if (data.length > 0) {
          window.location.href = "/dashboard"
        
        } else {
          document.getElementById("alreadyTaken").innerHTML = "Email or Username already taken. Please enter different information";
        }   
      })
    }
  }) 
})