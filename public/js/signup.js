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
        document.getElementById("notFilled").innerHTML = "Please fill out all forms"
        return;
      }
      
      // Once all fields have been filled (and email and user name values are unique), the form is emptied
      signUpUser(userData.email, userData.password, userData.name, userData.userName);
      emailInput.val("");
      passwordInput.val("");
      nameInput.val("");
      userNameInput.val("")
    });
    function signUpUser(email, password, name, userName) {
      $.post("/api/signup", {
        email: email,
        password: password,
        name: name,
        userName: userName
      }).then(function(data) {
        document.location.replace(data)
      }).catch(function(err){
        checkInfo(emailInput, userNameInput, data);
        console.log(err);
      });
      function checkInfo(data){
        if (!emailInput === data.email || !userNameInput === data.userName){
        } else
        document.getElementById("alreadyTaken").innerHTML = "Email or Username already taken. Please enter different information";
      }
    }
  });