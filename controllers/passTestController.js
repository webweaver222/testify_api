const testService = require('../services/testService')


const getTest = async (ctx, next) => {
    const {id} = ctx.params

    const test = await testService.getTest(id)

    ctx.body = {
       ...test
    }
        
}



module.exports = {
    getTest
}