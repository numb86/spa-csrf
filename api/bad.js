const express = require('express');
/* eslint-disable import/no-extraneous-dependencies */
const bodyParser = require('body-parser');
const session = require('express-session');

const common = require('./common');
const constants = require('../constants');

const app = express();

const {apiLogics} = common;

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: 'shhhh, very secret',
  })
);

app.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Origin',
    `http://localhost:${constants.SPA_PORT_NUMBER}`
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Max-Age', '600');

  next();
});

app.options('*', (req, res) => {
  res.sendStatus(200);
});

app.get(
  `${constants.COOKIE_API_PATH}${constants.END_POINT_USER}`,
  apiLogics.getUser
);

app.post(
  `${constants.COOKIE_API_PATH}${constants.END_POINT_LOGIN}`,
  apiLogics.postLogin
);

app.get(
  `${constants.COOKIE_API_PATH}${constants.END_POINT_LOGOUT}`,
  apiLogics.getLogout
);

app.post(
  `${constants.COOKIE_API_PATH}${constants.END_POINT_INCREMENT}`,
  apiLogics.postIncrement
);

app.post(
  `${constants.COOKIE_API_PATH}${constants.END_POINT_COUNT_RESET}`,
  apiLogics.postCountReset
);

app.listen(constants.BAD_API_PORT_NUMBER, 0, () => {
  console.log('bad api server start!');
});
