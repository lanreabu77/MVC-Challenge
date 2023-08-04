//  user model
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcryptjs');

class User extends Model {}

User.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [3, 20]
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8, 60]
    }
  }
}, {
  sequelize,
  modelName: 'User',
  freezeTableName: true,
  timestamps: false
});

User.beforeCreate(async (user) => {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
    } catch (error) {
      console.error('Error hashing password:', error);
    }
  });  

module.exports = User;
