import http from 'k6/http';
import { check, sleep } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const options = {
  vus: 5,
  duration: '1m',
};

export default () => {
  var totalQuestions = 3500000
  var randomQuestions = randomIntBetween((totalQuestions - (totalQuestions*.1)), totalQuestions);
  const response = http.get(`http://localhost:3000/qa/questions/${randomQuestions}/answers/?body=testanswer&asker_name=testname&asker_email=testemail@test.com`);

  check(response, {
    'Status is 200': (r) => r.status === 200,
  });

  sleep(5);
};