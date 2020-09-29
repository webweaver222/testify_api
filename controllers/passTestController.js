const testService = require("../services/testService");

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
  const { test } = ctx.state;

  try {
    const exam = await testService.createExam(null, null);

    await exam.setTest(test);

    ctx.status = 200;
    ctx.body = {
      examId: exam.id
    };
  } catch (e) {
    throw new Error(`Error in the passTestController->startTest ${e}`);
  }
};

const timer = async ctx => {
  const examId = ctx.params.examId;
  const { test } = ctx.state;

  const starTtimer = time => {
    if (time === null || time === 0 || time === undefined)
      return {
        status: 200,
        msg: "unlimited test-time"
      };

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        resolve({
          status: 200,
          msg: "Time Out1"
        });
      }, time * 60000 + 1500);

      eventEmitter.on("studentFinish", params => {
        if (examId === params) {
          clearTimeout(timeout);
          resolve({
            status: 200,
            msg: "finished"
          });
        }
      });
    });
  };

  const res = await starTtimer(test.timeLimit);

  ctx.status = res.status;
  ctx.message = res.msg;
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

  const stopTimer = eventEmitter.emit("studentFinish", id);
  if (!stopTimer) {
    // if timer for whatever reaseon was not started
  }

  eventEmitter.emit("prepareEmail", [test, exam.get()]);
};

module.exports = {
  getTest,
  startTest,
  timer,
  finishTest
};
