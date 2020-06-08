const Test     = require('../models/Test')
const Question = require('../models/Question')
const Exam     = require('../models/Exam')


module.exports = {
    getTest: async function (id) {
        return Test.findOne({
            where: { id },
        })
    },

    getExam: async function (id) {
        return Exam.findOne({
            where: { id },
        })
    },

    saveTest: async function ({testName, testDescription}) {
        return Test.create({ 
            testName: testName.trim(), 
            testDescription: testDescription.trim()
        })
       
    },

    saveQuestion: async function({body, rightAnswer, answers}) {
        return Question.create({
            body: body.trim(),
            rightAnswer: answers.findIndex(a => a.id === rightAnswer),
            answers: answers.map(a => a.body.trim())
        })
    },

    createExam: async function(name, answers) {
        return Exam.create({
            studentName: name,
            answers
        })
    },

}