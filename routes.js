const Router = require('koa-router')
const {testSave, questionsSave, resDispatch} = require('./controllers/postTestController')
const {getTest, startTest} = require('./controllers/passTestController')
const koaBody = require('koa-body')
const router = new Router()


router.get('/test/:id/:action*', getTest, startTest)


router.post('/test', koaBody(), testSave, questionsSave, resDispatch)

module.exports = router