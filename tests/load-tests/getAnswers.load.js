import http from 'k6/http';
import { check, sleep } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const options = {
  stages: [
    { duration: '1m', target: 200 },
    { duration: '2m', target: 200 },
    { duration: '1m', target: 0 },
  ],
};

export default function () {
  var totalQuestions = 3500000
  var randQuestion = randomIntBetween((totalQuestions - (totalQuestions*.1)), totalQuestions);
  const response = http.get(`http://localhost:3000/qa/questions/${randQuestion}/answers`);
  check(response, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}