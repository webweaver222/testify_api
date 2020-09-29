const pug = require('pug');
const nodemailer = require('nodemailer')
const {epass} = require('../config/config.json').development
const eventEmitter = require('./eventEmitter')



eventEmitter.on('prepareEmail', async ([test, {id: exam_id, studentName, answers, updatedAt}]) => {

    const questions = await test.getQuestions({ attributes: ['body', 'rightAnswer' , 'answers'] })
    const {testName} = test.get()

    let correct = 0

    questions.forEach((question, i) => {
        if (parseInt(question.get().rightAnswer) === answers[i]) {
            correct += 1
        }
    })

    const compiledFunction = pug.compileFile(require('path').resolve(__dirname, '../resorses/mailTemplate.pug'));

   

    const mail = compiledFunction({
        exam_id: exam_id,
        test_name: testName,
        student_name: studentName,
        date: updatedAt.toLocaleDateString("en-US"),
        resault: `${correct}/${questions.length}`,
        questions: questions.map(q=>q.get().body),
        answers: answers.map((a, i) => questions[i].get().answers[a]),
        rightAnswers: questions.map(q=>q.get().answers[q.get().rightAnswer])
    })

    //eventEmitter.emit('sendEmail', [mail])
})


eventEmitter.on('sendEmail', ([mail, adress = 'fukirx@gmail.com']) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'fukiry@gmail.com',
      pass: epass
    }
  });

  const mailOptions = {
    from: 'fukiry@gmail.com',
    to: adress,
    subject: 'Sending Email using Node.js',
    html: mail
  };
  
  transporter.sendMail(mailOptions).then((err, info) => {
      console.log(err);
      console.log(info);
  })
})

module.exports = eventEmitter

