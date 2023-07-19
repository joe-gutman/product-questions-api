import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 5,
  duration: '1m',
};

export default () => {
  const response = http.get('https://localhost:3000/1/qa/questions/');

  check(response, {
    'Status is 200': (r) => r.status === 200,
  });

  sleep(5);
};