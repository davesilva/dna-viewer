const routes = require('./routes');
const express = require('express');
const request = require('supertest');
const fs = require('fs');

jest.mock('fs', () => ({
  promises: {
    stat: jest.fn(),
    readFile: jest.fn()
  }
}));

const initServer = () => {
  const app = express();
  app.use(routes());
  return app;
};

describe('GET /', () => {
  it('returns the static homepage', async () => {
    const app = initServer();
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });
});

describe('GET /sequence/:name', () => {
  it('returns a 404 if the sequence is not found', async () => {
    fs.promises.stat.mockResolvedValue(undefined);
    fs.promises.readFile.mockResolvedValue(undefined);

    const app = initServer();
    const response = await request(app).get('/sequence/non_existent');
    expect(response.status).toBe(404);
  });

  it('returns data about the sequence', async () => {
    fs.promises.stat.mockResolvedValue({ size: 10 });
    fs.promises.readFile.mockResolvedValue(JSON.stringify([
      {start: 0, end: 9, name: 'The whole thing', strand: '+'}
    ]));

    const app = initServer();
    const response = await request(app).get('/sequence/test');
    expect(response.status).toBe(200);
    expect(response.body.nucleotides).toBe(10);
    expect(response.body.annotations[0].start).toBe(0);
  });
});
