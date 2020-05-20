const {Model, 
    Model: {Sequelize, connection}
} = require('./Model');


class Question extends Model {}
Question.init({
  
  body: {
    type: Sequelize.STRING,
    allowNull: false
  },
  
  rightAnswer: {
      type: Sequelize.STRING,
      allowNull: false
  },

  answers: Sequelize.ARRAY(Sequelize.TEXT) 
}, {
  sequelize : connection,
  modelName: 'question'
});

module.exports = Question