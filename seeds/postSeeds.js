const { Blogpost } = require('../models');

const postData = require('./postSeeds.json');

const seedPosts = () => Blogpost.bulkCreate(postData);

module.exports = seedPosts;