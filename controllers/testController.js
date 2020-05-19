const testSave = async (ctx, next) => {
    const {body : test} = ctx.request
    
    ctx.body = 'juo'
}

const test = (ctx, next) => {
    console.log('fff')
    next()
}





module.exports = {testSave, test}