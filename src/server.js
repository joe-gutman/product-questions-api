const bodyParser = require('body-parser');
const express = require('express');
const db = require('./queries.js');

const port = 3000;

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.get('/', (request, response) => {
  route.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/:product_id/qa/questions', (request, response) => {
  db.getQuestions(request)
    .then((results) => {
      response.status(200).json(results);
    })
    .catch((error) => {
      response.status(400).json(error);
    });
  });


// app.get('qa/questions/:question_id/answers', (request, res) => {
//   db.getAnswers(request, response);
// });

// app.post('qa/questions', (request, res) => {
//   db.postQuestion(request, response);
// });

// app.post('qa/questions/:question_id/answers', (request, res) => {
//   db.postAnswer(request, response);
// });

// app.put('qa/questions/:question_id/helpful', (request, res) => {
//   db.putQuestionHelpful(request, response);
// });

// app.put('qa/questions/:question_id/report', (request, res) => {
//   db.putQuestionReport(request, response);
// });

// app.put('qa/answers/:answer_id/helpful', (request, res) => {
//   db.putAnswerHelpful(request, response);
// });

// app.put('qa/answers/:answer_id/report', (request, res) => {
//   db.putAnswerReport(request, response);
// });

app.listen(port, () => {
  console.log(`App running on port ${port}`);
})