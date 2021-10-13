const Router = require("koa-router");
const {
  testSave,
  questionsSave,
  resDispatch,
} = require("./controllers/postTestController");
const { getResults } = require("./controllers/resultsController");
const { getTest } = require("./controllers/passTestController");
const { getToken } = require("./controllers/tokenController");
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

test_router.get("/results/:exam_id", getResults);

test_router.post("/", koaBody(), testSave, questionsSave, resDispatch);

test_router.post("/token", koaBody(), getToken);

module.exports = test_router;
