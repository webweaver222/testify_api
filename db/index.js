const Sequelize = require('sequelize');
const {driver, user, password, host, port, dbName} = require('./config.json').db


module.exports =  new Sequelize(`${driver}://${user}:${password}@${host}:${port}/${dbName}`);




