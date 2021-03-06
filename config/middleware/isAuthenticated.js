// this is middleware for restricting routes a user is not allowed to visit if not logged in
module.exports = function(req, res, next) {
    if (req.user) {
      return next();
    }
  
    //if not logged in, this will return the user to the login page
    return res.redirect("/");
  };
  