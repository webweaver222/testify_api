const testService = require("../services/testService");

const getTest = async (ctx, next) => {
  const { testId } = ctx.params;

  try {
    const test = await testService.getTest(testId);
    const questions = await test.getQuestions({
      attributes: ["body", "answers"],
    });

    ctx.state.test = test;
    ctx.state.questions = questions;

    return next();
  } catch (e) {
    if (e === "404") {
      const error = new Error(e);
      error.status = 404;
      throw error;
    }
    throw new Error(e);
  }
};

module.exports = {
  getTest,
};
