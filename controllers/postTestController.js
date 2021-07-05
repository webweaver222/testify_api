const testService = require("../services/testService");

const testSave = async (ctx, next) => {
  const {
    body: { questions, ...testData },
  } = ctx.request;

  ctx.state.questions = questions;

  try {
    const testObj = await testService.saveTest(testData);
    ctx.state.test = testObj;

    return await next();
  } catch (e) {
    throw new Error(`Error in the TestController->testSave: ${e}`);
  }
};

const questionsSave = async (ctx, next) => {
  const { questions, test } = ctx.state;

  try {
    await Promise.all(
      questions.map(async (q) => {
        const question = await testService.saveQuestion(q);
        return await question.setTest(test);
      })
    );

    return next();
  } catch (e) {
    throw new Error(`Error in the TestController->testQuestions: ${e}`);
  }
};

const resDispatch = async (ctx) => {
  const { response } = ctx;
  const { test } = ctx.state;

  response.status = 200;
  cd;
  response.body = {
    testId: test.id,
  };
};

module.exports = { testSave, questionsSave, resDispatch };
