const Test = require('../models/Test')
const Question = require('../models/Question')


module.exports = {
    getTest: async function (id) {
        return Test.findOne({
            where: { id },
        })
        .then(test => {
            if (!test) throw '404'
            return test.getQuestions({ attributes: ['body', 'answers']})
        .then(questions => {
            return {
                ...test.get(),
                questions: questions.map(q => q.get())
            }
            })}
        )
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
            rightAnswer: answers.find(a => a.id === rightAnswer).body.trim(),
            answers: answers.map(a => a.body.trim())
        })
    }
}