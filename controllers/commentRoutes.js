const express = require("express");
const router = express.Router({ mergeParams: true });
const isLoggedIn = require("../middleware/auth");
const { Comment } = require("../models");
// create a new comment
router.post("/new", isLoggedIn, (req, res) => {
  Comment.create({
    content: req.body.comment,
    user_id: req.session.user.id,
    blog_id: req.body.blog_id,
  })
    .then((comment) => {
      res.redirect(`/post/${req.body.blog_id}`);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Error creating comment" });
    });
});

module.exports = router;
