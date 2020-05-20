const Test = require('../models/Test')
const Question = require('../models/Question')


module.exports = {
    saveTest: async function ({testName, testDescription}) {
        return Test.create({ testName, testDescription})
       
    },

    saveQuestion: async function(question) {

    }
}