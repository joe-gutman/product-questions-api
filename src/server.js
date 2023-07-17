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

app.get('/:product_id/qa/questions/:question_id/answers', (request, response) => {
  const question_id = request.params.question_id;
  if (question_id) {
    db.getAnswers(request)
      .then((results) => {
        response.status(200).json(results);
      })
      .catch((error) => {
        response.status(400).json(error);
      });
  }
});

app.post('/:product_id/qa/questions/', (request, response) => {
  console.log('request: ', request.query);
  question_id = request.params.question_id;
  db.postQuestion(request)
    .then((results) => {
      response.status(200).json(results);
    })
    .catch((error) => {
      response.status(400).json(error);
    });
});

app.post('/:product_id/qa/questions/:question_id/answers', (request, response) => {
  console.log('request: ', request.query);
  question_id = request.params.question_id;
  db.postQuestion(request)
    .then((results) => {
      response.status(200).json(results);
    })
    .catch((error) => {
      response.status(400).json(error);
    });
});

app.put('/:product_id/qa/questions/:question_id/helpful', (request, response) => {
  db.putQuestionHelpful(request)
    .then((results) => {
      response.status(200).json(results);
    })
    .catch((error) => {
      response.status(400).json(error);
    });
});

app.put('/:product_id/qa/answers/:answer_id/helpful', (request, response) => {
  db.putAnswerHelpful(request)
    .then((results) => {
      response.status(200).json(results);
    })
    .catch((error) => {
      response.status(400).json(error);
    });
});

app.put('/:product_id/qa/questions/:question_id/report', (request, response) => {
  db.putQuestionReport(request)
    .then((results) => {
      response.status(200).json(results);
    })
    .catch((error) => {
      response.status(400).json(error);
    });
});

app.put('/:product_id/qa/answers/:answer_id/report', (request, response) => {
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