const request = require('supertest');
const pool = require('../../db');
const app = require('../../index');

beforeAll(async () => {
  await pool.connect(); // Wait for the connection
});

describe('GET /health', () => {
  it('should return healthy message', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Healthy App');
  });
});

