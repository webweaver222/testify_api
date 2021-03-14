const Router = require("koa-router");
const {
  testSave,
  questionsSave,
  resDispatch,
} = require("./controllers/postTestController");
const { getTest } = require("./controllers/passTestController");
const koaBody = require("koa-body");
const test_router = new Router({
  prefix: "/test",
});

test_router.get("/:testId", getTest, (ctx) => {
  ctx.body = {
    ...ctx.state.test.get(),
    questions: ctx.state.questions.map((q) => q.get()),
    timeLimit: ctx.state.test.timeLimit * 60,
  };
});

test_router.post("/", koaBody(), testSave, questionsSave, resDispatch);

module.exports = test_router;
