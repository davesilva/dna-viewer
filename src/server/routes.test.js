const routes = require('./routes');
const express = require('express');
const request = require('supertest');
const fs = require('fs-extra');

jest.mock('fs-extra');

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

describe('GET /api/sequences', () => {
  it('returns an empty list if the data directory is not found', async () => {
    fs.readdir.mockRejectedValue({});

    const app = initServer();
    const response = await request(app).get('/api/sequences');
    expect(response.status).toBe(200);
    expect(response.body.sequences.length).toBe(0);
  });

  it('returns an empty list if there are no files in the directory', async () => {
    fs.readdir.mockResolvedValue([]);

    const app = initServer();
    const response = await request(app).get('/api/sequences');
    expect(response.status).toBe(200);
    expect(response.body.sequences.length).toBe(0);
  });

  it('returns a list of sequence names', async () => {
    fs.readdir.mockResolvedValue(['test']);

    const app = initServer();
    const response = await request(app).get('/api/sequences');
    expect(response.status).toBe(200);
    expect(response.body.sequences.length).toBe(1);
    expect(response.body.sequences[0]).toBe('test');
  });
});

describe('GET /api/sequences/:name', () => {
  it('returns a 404 if the sequence is not found', async () => {
    fs.stat.mockRejectedValue({});
    fs.readFile.mockRejectedValue({});

    const app = initServer();
    const response = await request(app).get('/api/sequences/non_existent');
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Sequence non_existent not found');
  });

  it('returns data about the sequence', async () => {
    fs.stat.mockResolvedValue({ size: 10 });
    fs.readFile.mockResolvedValue(JSON.stringify([
      {start: 0, end: 9, name: 'The whole thing', strand: '+'}
    ]));

    const app = initServer();
    const response = await request(app).get('/api/sequences/test');
    expect(response.status).toBe(200);
    expect(response.body.nucleotides).toBe(10);
    expect(response.body.annotations[0].start).toBe(0);
  });
});

describe('GET /api/sequences/:name/nucleotides', () => {
  it('returns a 404 if the sequence is not found', async () => {
    fs.readFile.mockRejectedValue({});

    const app = initServer();
    const response = await request(app).get('/api/sequences/non_existent/nucleotides');
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Sequence non_existent not found');
  });

  it('returns nucleotide data', async () => {
    fs.open.mockResolvedValue(1);
    fs.read.mockResolvedValue({
      buffer: Buffer.from('actggactgg'),
      bytesRead: 10
    });

    const app = initServer();
    const response = await request(app).get('/api/sequences/test/nucleotides');
    expect(response.status).toBe(200);
    expect(fs.read).toHaveBeenCalledWith(1, expect.any(Buffer), 0, 1000, 0);
    expect(response.body.nucleotides).toBe('actggactgg');
    expect(response.body.start).toBe(0);
    expect(response.body.end).toBe(10);
  });

  it('returns nucleotide data starting from a given offset', async () => {
    fs.open.mockResolvedValue(1);
    fs.read.mockResolvedValue({
      buffer: Buffer.from('actggactgg'),
      bytesRead: 10
    });

    const app = initServer();
    const response = await request(app).get('/api/sequences/test/nucleotides')
                                       .query({ start: 10, end: 20 });
    expect(response.status).toBe(200);
    expect(fs.read).toHaveBeenCalledWith(1, expect.any(Buffer), 0, 10, 10);
    expect(response.body.nucleotides).toBe('actggactgg');
    expect(response.body.start).toBe(10);
    expect(response.body.end).toBe(20);
  });
});
