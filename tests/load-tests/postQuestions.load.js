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

var randStr = (length) => {
  return randomString(length, 'abcdefghijklmnopqrstuvwxyz');
}

export default () => {
  var totalProducts = 1000000;
  var randomProduct = randomIntBetween((totalProducts - (totalProducts * .1)), totalProducts);
  const response = http.get(`http://localhost:3000/${randomProduct}/qa/questions/?body=test&asker_name=test&asker_email=test@test.com`);

  check(response, {
    'Status is 200': (r) => r.status === 200,
  });

  sleep(5);
};