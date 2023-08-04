const { Comment } = require('../models');

const commentData = require('./commentSeeds.json');

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
