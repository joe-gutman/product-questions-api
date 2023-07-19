import http from 'k6/http';
import {sleep} from 'k6';

export const options = {
  // Key configurations for breakpoint in this section
  executor: 'ramping-arrival-rate', //Assure load increase if the system slows
  stages: [
    { duration: '2h', target: 20000 }, // just slowly ramp-up to a HUGE load
  ],
};

export default () => {
  var randProd = randomrandomIntBetween(900000, 100000);
  const urlRes = http.req(`https://localhost:3000/${randProd}/qa/questions/`);
  sleep(1);
  const urlRes = http.req(`https://localhost:3000/${randProd}/qa/questions/?body="test"&asker_name="test"&asker_email="test@test.com"`);
  sleep(1);
};