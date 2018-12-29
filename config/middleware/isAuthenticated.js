// this is middleware for restricting routes a user is not allowed to visit if not logged in
module.exports = function(req, res, next) {
    if (req.user) {
      console.log("User authenticated");
      return next();
    }
  
    //if not logged in, this will return the user to the login page
    console.log("User not authenticated")
    return res.redirect("/");
  };
  