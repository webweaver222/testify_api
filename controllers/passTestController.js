const testService = require("../services/testService");
var schedule = require("node-schedule");
const eventEmitter = require("../eventListeners/emails");

const getTest = async (ctx, next) => {
  const { testId } = ctx.params;

  try {
    const test = await testService.getTest(testId);
    const questions = await test.getQuestions({
      attributes: ["body", "answers"]
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

const startTest = async ctx => {
  const { test, io } = ctx.state;

  try {
    const exam = await testService.createExam(null, null);

    await exam.setTest(test);

    if (test.timeLimit > 0) {
      const now = new Date();

      const stopTest = now.setMinutes(now.getMinutes() + 1);

      schedule.scheduleJob(`Timer ${exam.id}`, stopTest, function() {
        io.sockets.in(exam.id).emit("Test End");
      });
    }

    ctx.status = 200;
    ctx.body = {
      examId: exam.id
    };
  } catch (e) {
    throw new Error(`Error in the passTestController->startTest ${e}`);
  }
};

const finishTest = async ctx => {
  const { studentName, answers } = ctx.request.body;
  const id = ctx.params.examId;

  let exam = await testService.getExam(id);

  exam = await exam.update({
    studentName,
    answers
  });

  const test = await exam.getTest();

  ctx.status = 200;
  ctx.message = "test done";

  const timer = schedule.scheduledJobs[`Timer ${id}`];
  if (timer) {
    timer.cancel();
  }
  ctx.state.io.sockets.in(id).emit("Test End");

  //eventEmitter.emit("prepareEmail", [test, exam.get()]);
};

module.exports = {
  getTest,
  startTest,
  finishTest
};
