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
            LIMIT $2
            OFFSET $3`, [product_id, count, page])
        .then((results) => {
          resolve(results.rows);
        })
        .catch((error) => {
          reject(error);
        });
    })
  }
}


// const getAnswers = (request, response) => {
//   pool.question('SELECT * FROM answers WHERE question_id = $1', [request.params.question_id], (error, results) => {
//     if (error) {
//       response(error);
//     } else {
//       response.status(200).json(results.rows);
//     }
//   })
// }

// const postQuestion = (request, response) => {
//   var questionParams = [request.params.product_id, request.params.body, request.params.date_written, request.params.asker_name, request.params.asker_email]

//   pool.question('INSERT INTO questions (product_id, body, date_written, asker_name, asker_email) VALUES ($1, $2, $3, $4, $5)', questionParams, (error, results) => {
//     if (error) {
//       response(error);
//     } else {
//       response.status(200).json(results.rows);
//     }
//   })
// }

// const postAnswer = (request, response) => {
//   var answerParams = [request.params.question_id, request.params.body, request.params.date_written, request.params.answerer_name, request.params.answerer_email, request.params.reported, request.params.helpful]

//   pool.answers('INSERT INTO answers (question_id, body, date_written, answerer_name, answerer_email, reported, helpful) VALUES ($1, $2, $3, $4, $5, $6, $7)', answerParams, (error, results) => {
//     if (error) {
//       response(error);
//     } else {
//       response.status(200).json(results.rows);
//     }
//   })
// }

// const putQuestionHelpful = (request, response) => {
//   pool.answers('UPDATE questions SET helpful = helpful + 1 WHERE id = $1', [request.params.question_id], (error, results) => {
//     if (error) {
//       response(error);
//     } else {
//       response.status(200).json(results.rows);
//     }
//   })
// }

// const putQuestionReport = (request, response) => {
//   //set reported to tru
//   pool.answers('UPDATE questions SET reported = true WHERE id = $1', [request.params.question_id], (error, results) => {
//     if (error) {
//       response(error);
//     } else {
//       response.status(200).json(results.rows);
//     }
//   })
// }

// const putAnswerHelpful = (request, response) => {
//   pool.answers('UPDATE answers SET helpful = helpful + 1 WHERE id = $1', [request.params.question_id], (error, results) => {
//     if (error) {
//       response(error);
//     } else {
//       response.status(200).json(results.rows);
//     }
//   })
// }

// const putAnswerReport = (request, response) => {
//   pool.answers('UPDATE answers SET reported = true WHERE id = $1', [request.params.question_id], (error, results) => {
//     if (error) {
//       response(error);
//     } else {
//       response.status(200).json(results.rows);
//     }
//   })
// }




