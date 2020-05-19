const Sequelize = require('sequelize');
const {driver, user, password, host, port, dbName} = require('./config.json').db


const sequelize = new Sequelize(`${driver}://${user}:${password}@${host}:${port}/${dbName}`);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });