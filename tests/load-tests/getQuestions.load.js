import http from 'k6/http';
import {check, sleep} from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const options = {
  stages: [
    { duration: '1m', target: 200 },
    { duration: '2m', target: 200 },
    { duration: '1m', target: 0 },
  ],
};


export default () => {
  var randProd = randomIntBetween(900000, 100000);
  let response = http.get(`http://localhost:3000/${randProd}/qa/questions/`);
  check(response, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
};