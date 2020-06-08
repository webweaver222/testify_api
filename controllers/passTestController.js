const testService = require('../services/testService')
const sleep = require('util').promisify(setTimeout)

var events = require('events');
var eventEmitter = new events.EventEmitter();


const getTest = async (ctx, next) => {

    const { testId, action } = ctx.params
    
    try {
        const test = await testService.getTest(testId)
        const questions = await test.getQuestions({ attributes: ['body', 'answers'] })

        ctx.state.test = test

        if (action === 'start') {
            return await startTest()
        }

        if (action === 'startTimer') {
            return await startTimer()
        }

        ctx.body = {
            ...test.get(),
            questions: questions.map(q => q.get())
        }

    } catch (e) {
        if (e === '404') {
            const error = new Error(e)
            error.status = 404
            throw error
        }
        throw new Error(e)
    }
}


const startTest = async (ctx, next) => {

    const { test } = ctx.state

    try {
        const exam = await testService.createExam(null, null)

        await exam.setTest(test)


        ctx.status = 200
        ctx.body = {
            examId: exam.id
        }

    } catch (e) {
        throw new Error(`Error in the passTestController->startTest ${e}`)
    }

}

const startTimer = async (ctx, next) => {
   /* eventEmitter.on('studentFinish', (params = null) => {
        console.log(ctx.params.id);
    });*/

   
    await sleep(ctx.state.test.timeLimit || 5000)

    ctx.status = 200
    ctx.message = 'Time Out'
}


const finishTest = async (ctx) => {
    const { studentName, answers } = ctx.request.body
    const id = ctx.params.examId

    let exam = await testService.getExam(id)

    exam = await exam.update({ 
        studentName,
        answers
    })


    const test = await exam.getTest()

    console.log('updated');
  

    //eventEmitter.emit('studentFinish');
}


module.exports = {
    getTest,
    finishTest
}