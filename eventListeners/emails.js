const pug = require('pug');
const  events = require('events');
const nodemailer = require('nodemailer')
const {epass} = require('../config/config.json').development


const eventEmitter = new events.EventEmitter();

eventEmitter.on('sendEmail', async ([test, {id: exam_id, studentName, answers, updatedAt}]) => {

    const questions = await test.getQuestions({ attributes: ['body', 'rightAnswer' , 'answers'] })
    const {id : test_id, testName} = test.get()

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
        rightAnswers: questions.map((q, i) => q.get().answers[q.get().rightAnswer])
    })

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'fukiry@gmail.com',
          pass: epass
        }
      });
    
    
      
      var mailOptions = {
        from: 'fukiry@gmail.com',
        to: 'fukirx@gmail.com',
        subject: 'Sending Email using Node.js',
        html: mail
      };
      
      transporter.sendMail(mailOptions).then((err, info) => {
          console.log(err);
          console.log(info);
      })

    
})

module.exports = eventEmitter

