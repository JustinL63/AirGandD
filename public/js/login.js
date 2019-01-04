$(document).ready(function() {
    // var refs
    var loginForm = $("form.login");
    var emailInput = $("#emailInput");
    var passwordInput = $("#passwordInput");
  
    // checks to see if there's matching values in the user table
    loginForm.on("submit", function(event) {
      event.preventDefault();
      var userData = {
        email: emailInput.val().trim(),
        password: passwordInput.val().trim()
      };
  
      // clears form field after you log in 
      loginUser(userData.email, userData.password);
      emailInput.val("");
      passwordInput.val("");
    });
  
    // post to login api
    function loginUser(email, password) {
      $.post("/api/login", {
        email: email,
        password: password
      }).then(function(data) {
        window.location.replace(data);
        // throws error
      }).catch(function(err) {
        $("#wrongInfo").text("Incorrect login credentials. Please enter valid information.");
        console.log(err);
        return
      });
    }
  
  });