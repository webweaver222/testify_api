const { getExam } = require("./examService");
const pug = require("pug");

module.exports = {
  fetchData: async function (exam_id) {
    const exam = await getExam(exam_id);

    const test = await exam.getTest();

    const questions = await test.getQuestions({
      attributes: ["body", "rightAnswer", "answers"],
    });

    return { test: test.get(), exam: exam.get(), questions };
  },

  caclResults: function ({
    exam: { id, studentName, answers, updatedAt },
    test: { testName },
    questions,
  }) {
    const correct = questions.reduce((acc, question, i) => {
      if (parseInt(question.get().rightAnswer) === answers[i]) return acc + 1;
      return acc;
    }, 0);

    return {
      exam_id: id,
      test_name: testName,
      student_name: studentName,
      date: updatedAt.toLocaleDateString("en-US"),
      result: `${correct}/${questions.length}`,
      questions: questions.map((q) => q.get().body),
      answers: answers.map((a, i) => questions[i].get().answers[a]),
      rightAnswers: questions.map((q) => q.get().answers[q.get().rightAnswer]),
    };
  },

  prepareDocument: function (results) {
    const compiledFunction = pug.compileFile(
      require("path").resolve(__dirname, "../resorses/ResultsTemplate.pug")
    );

    return compiledFunction(results);
  },
};
