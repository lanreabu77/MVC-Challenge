const { User } = require('../models');

const userData = require('./userSeeds.json');

const seedUsers = () => User.bulkCreate(userData, {individualHooks: true});

module.exports = seedUsers;
