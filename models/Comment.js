//  comment model 
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init({
  content: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 300]
    }
  },
  blog_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'blogpost',
        key: 'id',
    },
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'user',
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'Comment',
  freezeTableName: true,
  timestamps: true,
  createdAt: 'date_created',
  updatedAt: false,
});

module.exports = Comment;
