const express = require('express');
const router = express.Router();
const { User } = require('../models');

router.get('/', (req, res) => {
  res.render('signup');
});

router.post('/', (req, res) => {
  const { username, password, confirmpassword } = req.body;
  if (password !== confirmpassword) {
    return res.redirect('/signup?error=Passwords do not match');
  }
  User.findOne({ where: { username } })
    .then(user => {
      if (user) {
        res.redirect('/signup?error=Username already taken');
      } else {
        User.create({ username, password })
        .then(user => {
          req.session.user = {
            id: user.id,
            username: user.username,
          };
          req.session.loggedIn = true;

          req.session.save(() => {
            res.redirect('/dashboard');
          });
        })
        .catch(error => {
          console.error('Error:', error);
          res.status(500).json({ message: 'Internal server error' });
        });
      }
    })
    .catch(error => {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    });
});

module.exports = router;