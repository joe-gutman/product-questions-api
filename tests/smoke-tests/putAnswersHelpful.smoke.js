import http from 'k6/http';
import { check, sleep } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const options = {
  vus: 5,
  duration: '1m',
};

export default () => {
  var totalAnswers = 6800000;
  var randAnswers = randomIntBetween((totalAnswers - (totalAnswers * .1)), totalAnswers);
  const response = http.put(`http://localhost:3000/qa/answers/${randAnswers}/helpful`);

  check(response, {
    'Status is 200': (r) => r.status === 200,
  });

  sleep(5);
};