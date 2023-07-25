require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const db = require('./queries.js');
var cors = require('cors');

const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(cors())

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/:product_id/qa/questions/', (request, response) => {
  db.getQuestions(request)
    .then((results) => {
      response.status(200).json(results);
    })
    .catch((error) => {
      response.status(400).json(error);
      });
});

app.get('/qa/questions/:question_id/answers', (request, response) => {
  question_id = request.params.question_id;
  db.getAnswers(request, question_id)
    .then((results) => {
      response.status(200).json(results);
    })
    .catch((error) => {
      response.status(400).json(error);
    });
});

app.post('/:product_id/qa/questions/', (request, response) => {
  db.postQuestion(request)
    .then((results) => {
      response.status(200).json(results);
    })
    .catch((error) => {
      response.status(400).json(error);
    });
});

app.post('/qa/questions/:question_id/answers', (request, response) => {
  console.log(request.params.question_id);
  console.log(request.query);
  db.postAnswer(request)
    .then((results) => {
      response.status(200).json(results);
    })
    .catch((error) => {
      response.status(400).json(error);
    });
});

app.put('/qa/questions/:question_id/helpful', (request, response) => {
  db.putQuestionHelpful(request)
    .then((results) => {
      response.status(200).json(results);
    })
    .catch((error) => {
      response.status(400).json(error);
    });
});

app.put('/qa/questions/:question_id/answers', (request, response) => {
  db.putAnswerHelpful(request)
    .then((results) => {
      response.status(200).json(results);
    })
    .catch((error) => {
      response.status(400).json(error);
    });
});

app.put('/qa/answers/:answer_id/helpful', (request, response) => {
  db.putAnswerHelpful(request)
    .then((results) => {
      response.status(200).json(results);
    })
    .catch((error) => {
      response.status(400).json(error);
    });
});

app.put('/qa/questions/:question_id/report', (request, response) => {
  db.putQuestionReport(request)
    .then((results) => {
      response.status(200).json(results);
    })
    .catch((error) => {
      response.status(400).json(error);
    });
});

app.put('/qa/answers/:answer_id/report', (request, response) => {
  db.putAnswerReport(request)
    .then((results) => {
      response.status(200).json(results);
    })
    .catch((error) => {
      response.status(400).json(error);
    });
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
})