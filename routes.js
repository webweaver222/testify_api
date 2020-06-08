const Router = require('koa-router')
const {testSave, questionsSave, resDispatch} = require('./controllers/postTestController')
const {getTest, startTest, finishTest, examProcess} = require('./controllers/passTestController')
const koaBody = require('koa-body')
const router = new Router()


router.get('/test/:testId/:action*', getTest)

//router.get('/exam/:examId/startTimer', examProcess)

router.post('/test/:examId/finish', koaBody(), finishTest)

router.post('/test', koaBody(), testSave, questionsSave, resDispatch)

module.exports = router