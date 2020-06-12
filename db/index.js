const Sequelize = require('sequelize');
//const {driver, user, password, host, port, dbName, dialect} = require('../config/config.json').db
const config = require('../config/config.json').development

//module.exports =  new Sequelize(`${driver}://${user}:${password}@${host}:${port}/${dbName}`);



var sequelize = new Sequelize(
    config.database,
    config.username, 
    config.password, 
    {
        host: config.host,
        dialect: config.dialect,
        //port: conport,
    }
)

module.exports = sequelize;


