const testService = require('../services/testService')
const sleep = require('util').promisify(setTimeout)

var events = require('events');
var eventEmitter = new events.EventEmitter();


const getTest = async (ctx, next) => {

    const {id, action} = ctx.params

    try {
        const test = await testService.getTest(id)

        if (action === 'start') {
            ctx.state.test = test
            return await next()
        }
        
        if (action === 'finish') {
            return await finishTest()
        }

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


const startTest = async (ctx, next) => {

   
    eventEmitter.on('studentFinish', (param) => {
        console.log(param);
    });

    await sleep(ctx.state.test.timeLimit || 14000)

    ctx.status = 200
    ctx.message = 'Time out'
}


const finishTest = async (ctx) => {
    eventEmitter.emit('studentFinish', 'sex');
}


module.exports = {
    getTest,
    startTest
}