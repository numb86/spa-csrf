const express = require('express');
const history = require('connect-history-api-fallback');

const constants = require('../constants');

const app = express();
app.use(history());
app.use(express.static(`${__dirname}/public`));

app.listen(constants.SPA_PORT_NUMBER, 0, () => {
  console.log('spa server start!');
});
