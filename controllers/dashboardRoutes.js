const express = require('express');
const router = express.Router();
const { Blogpost } = require('../models');
const isLoggedIn = require('../middleware/auth');
// home route
router.get('/', isLoggedIn, (req, res) => {
  console.log("Inside Dashboard Route");
  console.log("Session User: ", req.session.user);
  if (!req.session || !req.session.user) {
    return res.status(401).json({ message: 'You must be logged in to view this page' });
  }
  Blogpost.findAll({
    where: {
      user_id: req.session.user.id
  }
    })
    .then(blogPosts => {
      const plainBlogPosts = blogPosts.map(post => post.get({ plain: true }));
      console.log(plainBlogPosts);
      res.render('dashboard', { posts: plainBlogPosts });
    })
  .catch(err => {
    res.status(500).json({ message: 'Error retrieving blog posts' });
  });
});

router.delete('/:id', isLoggedIn, (req, res) => {
  Blogpost.destroy({
      where: {
          id: req.params.id,
          user_id: req.session.user.id
      }
  })
  .then(deleted => {
      if (deleted) {
          res.status(200).json({ message: 'Blog post deleted successfully' });
      } else {
          res.status(404).json({ message: 'Blog post not found' });
      }
  })
  .catch(err => {
      res.status(500).json({ message: 'Error deleting blog post' });
  });
});

module.exports = router;