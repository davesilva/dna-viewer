const { Router } = require('express');
const { promises: fs } = require('fs');
const path = require('path');

module.exports = (router = new Router()) => {
  router.get('/', (req, res) => {
    res.send('Hello World');
  });

  router.get('/sequence/:name', async (req, res) => {
    const name = req.params.name;
    const filepath = path.join('..', '..', 'data', name);
    const stats = await fs.stat(path.join(filepath, 'nucleotides'));
    const annotations = await fs.readFile(path.join(filepath, 'annotations.json'));
    if (stats && annotations) {
      const data = {
        nucleotides: stats.size,
        annotations: JSON.parse(annotations)
      };
      res.json(data);
    } else {
      const error = { error: `Sequence ${name} not found` };
      res.status(404).json(error);
    }
  });

  return router;
};
