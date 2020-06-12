const {Model, 
    Model: {Sequelize, connection}
} = require('./Model');


class Test extends Model {}
Test.init({
  
  testName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  testDescription: {
    type: Sequelize.STRING
  },
  publisherEmail: {
    type: Sequelize.STRING
  },
  timeLimit: {
    type: Sequelize.INTEGER
  }
}, {
  sequelize : connection,
  modelName: 'test'
});



module.exports = Test