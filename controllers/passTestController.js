const testService = require('../services/testService')


const getTest = async (ctx, next) => {

    const {id} = ctx.params

    try {
        const test = await testService.getTest(id)
        
        ctx.body = {
        ...test
        }    
            
    }  catch (e) {
        if (e === '404') {
            const error = new Error(e)
            error.status = 404
            throw error
        }
        throw new Error(e)
    }
}



module.exports = {
    getTest
}