const Exam = require("../models/Exam");
const testService = require("../services/testService");
const scheduler = require("node-schedule");

module.exports = {
  getExam: async function (id) {
    return Exam.findOne({
      where: { id },
    });
  },

  createExam: async function (name, answers) {
    return Exam.create({
      studentName: name,
      answers,
    });
  },

  startExam: async function (test_id, examTimeout) {
    try {
      const test = await testService.getTest(test_id);
      const exam = await this.createExam(null, null);

      await exam.setTest(test);

      if (test.timeLimit > 0) {
        const now = new Date();

        const stopTest = now.setMinutes(now.getMinutes() + 1);

        scheduler.scheduleJob(`Timer ${exam.id}`, stopTest, examTimeout);
      }

      return exam.id;
    } catch (e) {
      throw new Error(`Error in the socket->startTest ${e}`);
    }
  },

  finishExam: async function ({ studentName, answers, exam_id }) {
    try {
      let exam = await this.getExam(exam_id);

      exam = await exam.update({
        studentName,
        answers,
      });

      const test = await exam.getTest();

      const timer = scheduler.scheduledJobs[`Timer ${exam_id}`];

      if (timer) {
        timer.cancel();
      }
    } catch (e) {
      throw new Error(`Error in the socket->finishTest ${e}`);
    }
  },
};
