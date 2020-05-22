const Test = require('../models/Test')
const Question = require('../models/Question')


module.exports = {
    saveTest: async function ({testName, testDescription}) {
        return Test.create({ testName, testDescription})
       
    },

    saveQuestion: async function({body, rightAnswer, answers}) {
        return Question.create({
            body: null,
            rightAnswer: answers.find(a => a.id === rightAnswer).body,
            answers: answers.map(a => a.body)
        })
    }
}