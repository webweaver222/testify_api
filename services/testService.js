const Test = require("../models/Test");
const Question = require("../models/Question");

module.exports = {
  getTest: async function (id) {
    return Test.findOne({
      where: { id },
    });
  },

  saveTest: async function ({
    testName,
    testDescription,
    publisherEmail,
    timeLimit,
  }) {
    return Test.create({
      testName: testName.trim(),
      testDescription: testDescription.trim(),
      publisherEmail: publisherEmail.trim(),
      timeLimit: timeLimit,
    });
  },

  saveQuestion: async function ({ body, rightAnswer, answers }) {
    return Question.create({
      body: body.trim(),
      rightAnswer: answers.findIndex((a) => a.id === rightAnswer),
      answers: answers.map((a) => a.body.trim()),
    });
  },
};
