const {Model, 
    Model: {Sequelize, connection}
} = require('./Model');

const Test = require('./Test')


class Question extends Model {}
Question.init({
  
  body: {
    type: Sequelize.STRING,
    allowNull: false
  },
  
  rightAnswer: {
      type: Sequelize.INTEGER,
      allowNull: false
  },

  answers: Sequelize.ARRAY(Sequelize.TEXT) 
}, {
  sequelize : connection,
  modelName: 'question',
  underscored: true
});

Test.hasMany(Question);

Question.belongsTo(Test)

module.exports = Question