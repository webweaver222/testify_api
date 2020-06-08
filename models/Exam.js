const {Model, 
    Model: {Sequelize, connection}
} = require('./Model');

const Test = require('./Test')

class Exam extends Model {}

Exam.init({
    studentName: {
        type: Sequelize.STRING,
        allowNull: true
      },
    
      answers: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true
      }
     
},{
    sequelize : connection,
    modelName: 'exam',
    underscored: true
  });


Exam.belongsTo(Test)

Test.hasMany(Exam);



module.exports = Exam