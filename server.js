const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });
const routes = require('./controllers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const setLocals = require('./middleware/setLocals');
const { Blogpost, Comment, User } = require('./models');
const PORT = process.env.PORT || 3001;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// create a new session
const sequelizeStoreInstance = new SequelizeStore({
  db: sequelize,
});

app.use(session({
  secret: 'nO88bOllW6GTOwi4T2kiRy75vcUnICy9DQ5ZJLdZmVkC79lAfz2Sc4JLF8c',
  resave: false,
  saveUninitialized: false,
  store: sequelizeStoreInstance,
  cookie: { secure: 'auto' },
}));

app.use(setLocals);

app.use(routes);

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    console.log('Syncing models to the database...');
    return User.sync();
  })
  .then(() => {
    return Blogpost.sync();
  })
  .then(() => {
    return Comment.sync();
  })
  .then(() => {
    return sequelizeStoreInstance.sync(); 
  })
  .then(() => {
    console.log('Database & tables created!');
    app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  });
