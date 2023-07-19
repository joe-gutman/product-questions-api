import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 50 },
    { duration: '1m30s', target: 10 },
    { duration: '20s', target: 0 },
  ],
};

export default function () {
  const res = http.post('https://localhost:3000/1/q/questions/?body=test&asker_name=test&asker_email=test@test.com');
  check(res, { 'status was 200': (r) => r.status == 200 });
  console.log(res.body);
  sleep(1);
}