const Sequelize = require('sequelize');
const sequelize = require('../db')


const Model = Sequelize.Model

Model.Sequelize = Sequelize
Model.connection = sequelize

module.exports = {Model}