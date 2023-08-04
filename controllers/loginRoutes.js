const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { User } = require('../models');

router.get('/', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/home');
      return;
    }
    res.render('login');
  });

  router.post('/', (req, res) => {
    const { username, password } = req.body;
    User.findOne({ where: { username } })
      .then(user => {
        if (user) {
          bcrypt.compare(password, user.password)
            .then(match => {
              //  checks if the password matches
              if (match) {
                req.session.user = {
                  id: user.id,
                  username: user.username,
                };
                req.session.loggedIn = true;
                console.log("Session User: ", req.session.user);
                req.session.save(() => {
                  res.redirect('/home'); 
                });
              } else {
                res.redirect('/login?error=Invalid password'); 
              }
            })
            .catch(error => {
              console.error('Error:', error);
              res.status(500).json({ message: 'Internal server error' });
            });
        } else {
          res.redirect('/login?error=User not found');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
      });
  });

module.exports = router;