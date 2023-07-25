require('dotenv').config();
const Pool = require('pg').Pool
const db = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
})

var getQuestions = (request) => {
  return new Promise((resolve, reject) => {
    var product_id = request.params.product_id;
    var page = request.query.page || 1;
    var count = request.query.count || 5;
    var questions;

    db.query(`SELECT * FROM questions WHERE product_id = $1
          LIMIT $2 OFFSET $3`, [product_id, count, page])
      .then((results) => {
        questions = results.rows;

        var answerPromises = [];
        for (var i = 0; i < questions.length; i++) {
          answerPromises.push(db.query(`SELECT * FROM answers WHERE question_id = $1`, [questions[i].id]));
        }
        return Promise.all(answerPromises);
      })
      .then((results) => {
        for (var i = 0; i < questions.length; i++) {
          var answers = {};
          for (var j = 0; j < results[i].rows.length; j++) {
            answers[results[i].rows[j].id] = results[i].rows[j];
            answers[results[i].rows[j].id].photos = [];
          }
          questions[i].answers = answers;
        }
        resolve({"product_id":product_id, "page": page, "count":count, data: questions});
      })
      .catch((error) => {
        reject(error);
      });
  });
}
var getAnswers = (request, question_id) => {
  return new Promise((resolve, reject) => {
    var question_id = question_id || request.params.question_id;
    var page = request.query.page || 1;
    var count = request.query.count || 5;
    var answers;
    var photos;

    db.query(`SELECT * FROM answers WHERE question_id = $1
          LIMIT $2
          OFFSET $3`, [question_id, count, page])
      .then((results) => {
        answers = results.rows;

        var photoPromises = [];
        for (var i = 0; i < answers.length; i++) {
          answers[i].photos = [];
          photoPromises.push(db.query(`SELECT * FROM photos WHERE answer_id = $1`, [answers[i].id]));
        }
        return Promise.all(photoPromises);
      })
      .then((results) => {
        for (var i = 0; i < answers.length; i++) { //currentanswer
          for (var j = 0; j < results[i].rows.length; j++) { //currentphoto
            answers[i].photos.push(results[i].rows[j]);
          }
        }
        resolve(answers);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

var postQuestion = (request) => {
  return new Promise((resolve, reject) => {
    var product_id = request.params.product_id;
    var body = decodeURIComponent(request.query.body);
    var asker_name = decodeURIComponent(request.query.asker_name);
    var asker_email = decodeURIComponent(request.query.asker_email);

    db.query('INSERT INTO questions (product_id, body, asker_name, asker_email) VALUES ($1, $2, $3, $4)', [product_id, body, asker_name, asker_email])
      .then((results) => {
        resolve(results);
      })
      .catch((error) => {
        reject(error);
      });
  })
}

var postAnswer = (request) => {
  return new Promise((resolve, reject) => {
    var question_id = request.params.question_id;
    var body = decodeURIComponent(request.query.body);
    var asker_name = decodeURIComponent(request.query.asker_name);
    var asker_email = decodeURIComponent(request.query.asker_email);
    var photos = decodeURIComponent(request.query.photos);

    console.log('question_id: ', question_id, '\nbody: ', body, '\nanswerer_name: ', answerer_name, '\nanswerer_email: ', answerer_email, '\nphotos: ', photos)

    db.query('INSERT INTO answers (question_id, body, answerer_name, answerer_email) VALUES ($1, $2, $3, $4)', [question_id, body, answerer_name, answerer_email])
      .then((results) => {
        db.query('INSERT INTO photos (answer_id, url) VALUES ($1, $2)', [results.rows[0].id, photos])
          .then((results) => {
            resolve(results);
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        reject(error);
      });
  })
}

var putQuestionHelpful = (request) => {
  return new Promise((resolve, reject) => {
    var question_id = request.params.question_id;

    db.query('UPDATE questions SET helpful = helpful + 1 WHERE id = $1', [question_id])
    .then((results) => {
      resolve(results);
    })
    .catch((error) => {
      reject(error);
    });
  })
}

var putAnswerHelpful = (request) => {
  return new Promise((resolve, reject) => {
    var answer_id = request.params.answer_id;

    db.query('UPDATE answers SET helpful = helpful + 1 WHERE id = $1', [answer_id])
      .then((results) => {
        resolve(results);
      })
      .catch((error) => {
        reject(error);
      });
  })
}

var putQuestionReport = (request) => {
  return new Promise((resolve, reject) => {
    var question_id = request.params.question_id;

    db.query('UPDATE questions SET reported = true WHERE id = $1', [question_id])
      .then((results) => {
        resolve(results);
      })
      .catch((error) => {
        reject(error);
      });
  })
}

var putQuestionHelpful = (request) => {
  return new Promise((resolve, reject) => {
    var question_id = request.params.question_id;

    db.query('UPDATE questions SET helpful = helpful + 1 WHERE id = $1', [question_id])
      .then((results) => {
        resolve(results);
      })
      .catch((error) => {
        reject(error);
      });
  })
}

var putAnswerReport = (request) => {
  return new Promise((resolve, reject) => {
    var answer_id = request.params.answer_id;

    db.query('UPDATE answers SET reported = true WHERE id = $1', [answer_id])
      .then((results) => {
        resolve(results);
      })
      .catch((error) => {
        reject(error);
      });
  })
}

module.exports = { getQuestions,
                   getAnswers,
                   postQuestion,
                   postAnswer,
                   putQuestionHelpful,
                   putAnswerHelpful,
                   putQuestionReport,
                   putAnswerReport };