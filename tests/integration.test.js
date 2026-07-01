const request = require('supertest');
const server = require('../index');

describe('Testes de Integração da API', () => {
  afterAll((done) => {
    server.close(done);
  });

  test('GET / deve responder com status 200 e informações básicas', async () => {
    const response = await request(server).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('status', 'running');
  });

  test('GET /health deve responder com status 200 e status UP', async () => {
    const response = await request(server).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('status', 'UP');
    expect(response.body).toHaveProperty('uptime');
  });
});
