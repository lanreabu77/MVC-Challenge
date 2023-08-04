const express = require('express');
const router = express.Router();
const { Blogpost } = require('../models');
const isLoggedIn = require('../middleware/auth');

router.get('/:id?', isLoggedIn, (req, res) => {
  if (req.params.id) {
      Blogpost.findOne({
          where: {
              id: req.params.id,
              user_id: req.session.user.id
          }
      })
      .then(post => {
          if (post) {
              res.render('edit', { post: post.get({ plain: true }) });
          } else {
              res.status(404).json({ message: 'Post not found' });
          }
      })
      .catch(err => {
          res.status(500).json({ message: 'No blog post found' });
      });
  } else {
      res.render('edit');
  }
});

router.post('/', isLoggedIn, (req, res) => {
  Blogpost.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user.id
  })
  .then(blogPost => {
      res.status(200).json({ message: 'Blog post created successfully' });
  })
  .catch(err => {
      res.status(500).json({ message: 'Error creating blog post' });
  });
});

router.put('/:id', isLoggedIn, (req, res) => {
  Blogpost.update({
      title: req.body.title,
      content: req.body.content,
  }, {
      where: {
          id: req.params.id,
          user_id: req.session.user.id
      }
  })
  .then(updated => {
      if (updated[0] > 0) {
          res.status(200).json({ message: 'Blog post updated successfully' });
      } else {
          res.status(404).json({ message: 'Blog post not found' });
      }
  })
  .catch(err => {
      res.status(500).json({ message: 'Error updating blog post' });
  });
});

module.exports = router;