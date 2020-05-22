const testService = require('../services/testService')


const testSave = async (ctx, next) => {
    const {body :  {questions, ...testData}} = ctx.request
  
     ctx.state.questions = questions
    try {
        const testObj = await testService.saveTest(testData)
        ctx.state.test = testObj      
        next()
       
    } catch (e) {
        throw new Error(`Error in the TestController->testSave: ${e}`)
    }
}


const questionsSave = async (ctx) => {

    const {questions, test} = ctx.state

        await Promise.all(questions.map(q => 
        {   
            testService.saveQuestion(q)
            .then(question => question.setTest(test))
            .catch(err => {
                throw new Error(`Error in the TestController->questionSave: ${err}`)
            })
        }))
        ctx.body = 'juo'

}






module.exports = {testSave, questionsSave}