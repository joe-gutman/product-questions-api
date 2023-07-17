const Pool = require('pg').Pool
const db = new Pool({
  user: 'joegutman',
  host: 'localhost',
  database: 'atelier',
  password: '5633',
  port: 5432,
})


module.exports = {
  getQuestions: (request) => {
    return new Promise((resolve, reject) => {

      var product_id = request.params.product_id;
      var page = request.query.page || 1;
      var count = request.query.count || 5;

      db.query(`SELECT * FROM questions WHERE product_id = $1
            LIMIT $2 OFFSET $3`, [product_id, count, page])
        .then((results) => {
          var questions = results.rows;
          resolve(results.rows);
        })
        .catch((error) => {
          reject(error);
        });
    })
  },
  postQuestion: (request) => {
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
  },
  putQuestionHelpful: (request) => {
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
  },
  putQuestionReport: (request) => {
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
  },
  getAnswers: (request) => {
    return new Promise((resolve, reject) => {
      var product_id = request.params.product_id;
      var question_id = request.params.question_id;
      var page = request.query.page || 1;
      var count = request.query.count || 5;

      db.query(`SELECT * FROM answers WHERE question_id = $1
            LIMIT $2
            OFFSET $3`, [product_id, count, page])
        .then((results) => {
          var questions = results.rows;
          resolve(results.rows);
        })
        .catch((error) => {
          reject(error);
        });
    })
  },
  postAnswer: (request) => {
    return new Promise((resolve, reject) => {
      var question_id = request.params.question_id;
      var body = request.params.body;
      var answerer_name = request.params.answerer_name;
      var answerer_email = request.params.answerer_email;
      var photos = request.params.photos;

      console.log('question_id: ', question_id, '\nbody: ', body, '\nanswerer_name: ', answerer_name, '\nanswerer_email: ', answerer_email, '\nphotos: ', photos)

      var mainResult = null;

      db.query('INSERT INTO answers (question_id, body, date_written, answerer_name, answerer_email, photos) VALUES ($1, $2, $3, $4, $5, $6)', [question_id, body, date_written, answerer_name, answerer_email])
        .then((results) => {
          mainResult = results;
          if(photos && photos.length !== 0) {
            var photoPromises = [];
            for (var i = 0; i < photos.length; i++) {
              photoPromises.push(db.query('INSERT INTO photos (answer_id, url) VALUES ($1, $2)', [results.rows[0].answer_id, photos[i]]));
            }
            return Promise.all(photoPromises);
          }
        })
        .then((results) => {
          resolve(results);
        })
        .catch((error) => {
          reject(error);
        });
    })
  },
  putAnswerHelpful: (request) => {
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
  },putQuestionHelpful: (request) => {
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
  },
  putAnswerReport: (request) => {
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
}