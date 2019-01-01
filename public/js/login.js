$(document).ready(function() {
    // var refs
    var loginForm = $("form.login");
    var emailInput = $("#emailInput");
    var passwordInput = $("#passwordInput");
  
    // checks to see if theres an empty form and checks to see if theres matching values in the user table
    loginForm.on("submit", function(event) {
      event.preventDefault();
      var userData = {
        email: emailInput.val().trim(),
        password: passwordInput.val().trim()
      };
  
      if (!userData.email || !userData.password) {
        document.getElementById("notFilledOut").innerHTML = "Please fill out all forms"
        return;
      }
  
      // clears form field after you log in 
      loginUser(userData.email, userData.password);
      emailInput.val("");
      passwordInput.val("");
    });
  
    // post to login api, goes to main webpage
    function loginUser(email, password) {
      $.post("/api/login", {
        email: email,
        password: password
      }).then(function(data) {
        window.location.replace(data);
        // throws error
      }).catch(function(err) {
        document.getElementById("wrongInfo").innerHTML = "Incorrect login credentials. Please enter valid information"
        console.log(err);
        return
      });
    }
  
  });