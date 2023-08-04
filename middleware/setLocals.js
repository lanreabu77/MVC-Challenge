module.exports = (req, res, next) => {
    res.locals.logged_in = req.session.loggedIn;
    next();
  };
  