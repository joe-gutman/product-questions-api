import http from 'k6/http';
import { check, sleep } from 'k6';
import { randomIntBetween, randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const options = {
  stages: [
    { duration: '2m', target: 2000 },
    { duration: '1m', target: 0 },
  ],
};

var randStr = (length) => {
  return randomString(length);
}

export default () => {
  var totalQuestions = 3500000
  var randomQuestions = randomIntBetween((totalQuestions - (totalQuestions*.1)), totalQuestions);
  const response = http.get(`http://localhost:3000/qa/questions/${randomQuestions}/answers/?body=${randStr(20)}&asker_name=${randStr(8)}&asker_email=${randStr(10)}@gmail.com`);

  check(response, {
    'Status is 200': (r) => r.status === 200,
  });

  sleep(5);
};