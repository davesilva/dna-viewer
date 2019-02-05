const { Router } = require('express');
const fs = require('fs-extra');
const path = require('path');

module.exports = (router = new Router()) => {
  router.get('/api/sequences', async (req, res) => {
    const filepath = path.join(__dirname, '..', '..', 'data');
    try {
      const files = await fs.readdir(filepath);
      res.status(200).json({ sequences: files });
    } catch(e) {
      res.status(200).json({ sequences: [] });
    }
  });

  router.get('/api/sequences/:name', async (req, res) => {
    const name = req.params.name;
    const filepath = path.join(__dirname, '..', '..', 'data', name);
    try {
      const stats = await fs.stat(path.join(filepath, 'nucleotides'));
      const annotations = await fs.readFile(path.join(filepath, 'annotations.json'));
      const data = {
        nucleotides: stats.size,
        annotations: JSON.parse(annotations)
      };
      res.json(data);
    } catch(e) {
      const error = { error: `Sequence ${name} not found` };
      res.status(404).json(error);
    }
  });

  router.get('/api/sequences/:name/nucleotides', async (req, res) => {
    const name = req.params.name;
    const filepath = path.join(__dirname, '..', '..', 'data', name);
    const start = Number(req.query.start || 0);
    const end = Number(req.query.end || 1000);
    const length = end - start;
    try {
      const file = await fs.open(path.join(filepath, 'nucleotides'), 'r');
      const { buffer, bytesRead } =
            await fs.read(file, Buffer.alloc(length), 0, length, start);
      res.json({
        nucleotides: buffer.toString('utf8', 0, bytesRead),
        start,
        end: start + bytesRead
      });
    } catch(e) {
      const error = { error: `Sequence ${name} not found` };
      res.status(404).json(error);
    }
  });

  return router;
};
