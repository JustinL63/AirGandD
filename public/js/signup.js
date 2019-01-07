$(document).ready(function () {
  // Create variables to hold form data
  var signupForm = $("form.signup");
  var emailInput = $("#emailInput");
  var passwordInput = $("#passwordInput");
  var nameInput = $("#nameInput");
  var userNameInput = $("#userNameInput");

  // When submit button is clicked...
  signupForm.on("submit", function (event) {
    event.preventDefault();
    // Grab values from form and store in userData object
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      name: nameInput.val().trim(),
      userName: userNameInput.val()
    };
    // Once all fields have been filled (and email and user name values are unique), the form is emptied
    signUpUser(userData);
    emailInput.val("");
    passwordInput.val("");
    nameInput.val("");
    userNameInput.val("")

    function signUpUser(userData) {
      $.post("/api/signup", userData
      ).then(function (data) {
        if (data.length > 0) {
          window.location.href = "/dashboard"

        } else {
          $("#alreadyTaken").html("<i class='fas fa-exclamation-triangle'></i>&nbsp&nbspEmail or username already taken. Please try different information.")
        }
      })
    }
  })
})