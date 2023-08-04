const express = require("express");
const router = express.Router();
const { Blogpost, Comment, User } = require("../models");
const commentRoutes = require("./commentRoutes");

router.use("/:id/comments", commentRoutes);
//  fetch specific blog posts
router.get("/:id", (req, res) => {
  const { id } = req.params;

  Blogpost.findByPk(id, {
    include: [
      {
        model: User,
        as: "user",
        attributes: ["username"],
      },
      {
        model: Comment,
        as: "comments",
        include: [
          {
            model: User,
            attributes: ["username"],
            as: "user",
          },
        ],
      },
    ],
  })
    .then((blogPost) => {
      if (blogPost) {
        const blogPostData = blogPost.get({ plain: true });

        let date = new Date(blogPostData.date_created);
        let formattedDate = `${
          date.getMonth() + 1
        }/${date.getDate()}/${date.getFullYear()}`;
        blogPostData.date_created = formattedDate;

        blogPostData.comments.forEach((comment) => {
          let commentDate = new Date(comment.date_created);
          let formattedCommentDate = `${
            commentDate.getMonth() + 1
          }/${commentDate.getDate()}/${commentDate.getFullYear()}`;
          comment.date_created = formattedCommentDate;
        });

        res.render("blogpost", {
          blogPost: blogPostData,
          loggedIn: req.session.loggedIn,
        });
      } else {
        res.status(404).send("Blog post not found");
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    });
});

module.exports = router;
