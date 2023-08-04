//  blog post model
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Blogpost extends Model {}

Blogpost.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 100]
    }
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
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
  modelName: 'Blogpost',
  freezeTableName: true,
  timestamps: true,
  createdAt: 'date_created',
  updatedAt: false,
});

module.exports = Blogpost;
