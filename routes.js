const Router = require('koa-router')
const {testSave, questionsSave} = require('./controllers/testController')
const koaBody = require('koa-body')
const router = new Router()

router.post('/saveTest', koaBody(), testSave, questionsSave)

module.exports = router