//  home page model
const User = require('./User');
const Comment = require('./Comment');
const Blogpost = require('./Blogpost');

User.hasMany(Blogpost, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  as: 'blogposts'
});

Blogpost.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

Blogpost.hasMany(Comment, {
  foreignKey: 'blog_id',
  onDelete: 'CASCADE',
  as: 'comments'
});

Comment.belongsTo(Blogpost, {
  foreignKey: 'blog_id',
  as: 'blogpost'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  as: 'comments'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});



module.exports = { User, Blogpost, Comment };