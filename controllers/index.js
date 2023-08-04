const express = require('express');
const router = express.Router();

const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const loginRoutes = require('./loginRoutes');
const signupRoutes = require('./signupRoutes');
const blogpostRoutes = require('./blogpostRoutes');
const editRoutes = require('./editRoutes');
const logoutRoute = require ('./logoutRoute');

function checkLogin(req, res, next) {
    console.log("Inside checkLogin middleware");
    console.log("Logged In Status: ", req.session.loggedIn);
    console.log("Session User: ", req.session.user);
  //   check if the user is logged in
    if (req.session.loggedIn) {
      console.log("Redirecting to Dashboard...");
      res.redirect('/dashboard'); 
    } else {
      console.log("Redirecting to Login...");
      res.redirect('/login');
    }
  }  

router.use('/home', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/login', loginRoutes);
router.use('/signup', signupRoutes);
router.use('/post', blogpostRoutes);
router.use('/edit', editRoutes);
router.use('/logout', logoutRoute);

router.get('/', checkLogin);

module.exports = router;