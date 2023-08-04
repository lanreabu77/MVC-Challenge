const sequelize = require('../config/connection');
const seedUser = require('./userSeeds');
const seedBlogpost = require('./postSeeds');
const seedComment = require('./commentSeeds');

const seedAll = async () => {
  await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
  await sequelize.query('ALTER TABLE Blogpost DROP FOREIGN KEY blogpost_ibfk_1');
  await sequelize.sync({ force: true });
  console.log('DATABASE SYNCED');
  
  await seedUser();
  console.log('USERS SEEDED');

  await seedBlogpost();
  console.log('BLOGPOSTS SEEDED');

  await seedComment();
  console.log('COMMENTS SEEDED');

  await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
  process.exit(0);
};

seedAll();