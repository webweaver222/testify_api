const Router = require('koa-router')
const {testSave, test} = require('./controllers/testController')
const koaBody = require('koa-body')
const router = new Router()

router.post('/saveTest', koaBody(), testSave)

module.exports = router