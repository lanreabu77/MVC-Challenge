function isLoggedIn(req, res, next) {
    console.log("Inside isLoggedIn middleware");
    console.log("Logged In Status: ", req.session.loggedIn);
    console.log("Session User: ", req.session.user);

    
    if (!req.session.loggedIn) {
      console.log("Not logged in. Sending error message...");
      res.status(401).json({ message: 'You must be logged in to view this page' });
    } else {
      console.log("Logged in. Proceeding to next middleware or route...");
      next();
    }
  };
  
  module.exports = isLoggedIn;