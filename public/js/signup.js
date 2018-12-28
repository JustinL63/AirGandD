$(document).ready(function() {
    // vars for ref
    var signUpForm = $("form.signup");
    var emailInput = $("#emailInput");
    var passwordInput = $("#passwordInput");
    var nameInput = $("#nameInput");
    var userNameInput = $("#userNameInput");
  
    // on click event for the data. Checks to see if theres no empty fields
    signUpForm.on("submit", function(event) {
      event.preventDefault();
      var userData = {
        email: emailInput.val().trim(),
        password: passwordInput.val().trim(),
        name: nameInput.val().trim(),
        userName: userNameInput.val()
      };
  
      if (!userData.email || !userData.password || !userData.name || !userData.userName) {
        return;
      }
      // once all fields have been filled (and all values are unique) we empty out the forms
      signUpUser(userData.email, userData.password, userData.name, userData.userName);
      emailInput.val("");
      passwordInput.val("");
      nameInput.val("");
      userNameInput.val("")
    });
  
    // posts up to the signup info api
    function signUpUser(email, password, name, userName) {
      $.post("/api/signup", {
        email: email,
        password: password,
        name: name,
        userName: userName
      }).then(function(data) {
        window.location.replace(data);
        // throws error
      })
    }
  });