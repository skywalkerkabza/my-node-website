import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter } from 'k6/metrics';

// Custom metrics
let errorCount = new Counter('errors');

export let options = {
    stages: [
        { duration: '30s', target: 20 },  // ramp-up to 20 users
        { duration: '1m', target: 20 },   // stay at 20 users
        { duration: '30s', target: 0 },   // ramp-down to 0 users
    ],
};

export default function () {
    const BASE_URL = 'http://localhost:3000/';

    // Simulate different user behaviors
    let res = http.get(`${BASE_URL}`);
    check(res, { 'Homepage loaded': (r) => r.status === 200 }) || errorCount.add(1);

    res = http.get(`${BASE_URL}`);
    check(res, { 'Login page loaded': (r) => r.status === 200 }) || errorCount.add(1);

    sleep(1);
}
