const express = require('express');
const routes = require('./routes');
const app = express();

app.use(routes());

app.listen(3001, function() {
  console.log('Listening on port 3001');
});
