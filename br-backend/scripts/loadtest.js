const http = require('http');

const BASE_URL = process.env.TARGET_URL || 'http://localhost:5001';
const CONCURRENCY = parseInt(process.env.CONCURRENCY) || 10;
const TOTAL_REQUESTS = parseInt(process.env.TOTAL_REQUESTS) || 100;

let completed = 0;
let errors = 0;
let successes = 0;
const latencies = [];

function makeRequest(path) {
  return new Promise((resolve) => {
    const start = Date.now();
    const req = http.get(`${BASE_URL}${path}`, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        const latency = Date.now() - start;
        latencies.push(latency);
        if (res.statusCode >= 200 && res.statusCode < 400) {
          successes++;
        } else {
          errors++;
        }
        completed++;
        resolve();
      });
    });
    req.on('error', () => {
      errors++;
      completed++;
      resolve();
    });
    req.setTimeout(5000, () => {
      req.destroy();
      errors++;
      completed++;
      resolve();
    });
  });
}

async function run() {
  console.log(`Load test: ${TOTAL_REQUESTS} requests, ${CONCURRENCY} concurrent`);
  console.log(`Target: ${BASE_URL}`);
  console.log('---');

  const paths = ['/api/menu', '/api/menu?search=chicken', '/api/branches'];
  const startTime = Date.now();

  const batches = [];
  for (let i = 0; i < TOTAL_REQUESTS; i += CONCURRENCY) {
    const batch = [];
    for (let j = 0; j < CONCURRENCY && i + j < TOTAL_REQUESTS; j++) {
      const path = paths[(i + j) % paths.length];
      batch.push(makeRequest(path));
    }
    batches.push(Promise.all(batch));
  }

  for (const batch of batches) {
    await batch;
    process.stdout.write(`\rCompleted: ${completed}/${TOTAL_REQUESTS}`);
  }

  const duration = Date.now() - startTime;
  latencies.sort((a, b) => a - b);

  console.log('\n---');
  console.log('Results:');
  console.log(`  Total requests: ${TOTAL_REQUESTS}`);
  console.log(`  Successful: ${successes}`);
  console.log(`  Errors: ${errors}`);
  console.log(`  Duration: ${duration}ms`);
  console.log(`  Requests/sec: ${(TOTAL_REQUESTS / (duration / 1000)).toFixed(2)}`);
  console.log(`  Avg latency: ${(latencies.reduce((a, b) => a + b, 0) / latencies.length).toFixed(0)}ms`);
  console.log(`  P50 latency: ${latencies[Math.floor(latencies.length * 0.5)]}ms`);
  console.log(`  P95 latency: ${latencies[Math.floor(latencies.length * 0.95)]}ms`);
  console.log(`  P99 latency: ${latencies[Math.floor(latencies.length * 0.99)]}ms`);
  console.log(`  Max latency: ${latencies[latencies.length - 1]}ms`);
}

run().catch(console.error);
