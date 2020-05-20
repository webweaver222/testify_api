const testService = require('../services/testService')


const testSave = async (ctx, next) => {
    const {body :  {questions, ...testData}} = ctx.request
  
     ctx.state.questions = questions
     const testObj = await testService.saveTest(testData)


    next()
}


const questionsSave = async (ctx) => {

    const {questions} = ctx.state
    
    //await Promise.all(questions.forEach(async (question, i) => await ))

    ctx.body = 'juo'
}






module.exports = {testSave, questionsSave}