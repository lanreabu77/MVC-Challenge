const express = require('express');
const router = express.Router();
const { Blogpost } = require('../models');
// fetch home page
router.get('/', (req, res) => {
  Blogpost.findAll()
      .then(blogposts => {
          const serializedBlogposts = blogposts.map(blogpost => {
            const blogpostData = blogpost.get({ plain: true });

            let date = new Date(blogpostData.date_created);
            let formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
            blogpostData.date_created = formattedDate;

            return blogpostData;
          });

          res.render('home', { blogposts: serializedBlogposts });
      })
      .catch(error => {
          console.error('Error:', error);
          res.status(500).json({ message: 'Internal server error' });
      });
});

module.exports = router;
