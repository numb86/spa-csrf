const express = require('express');

const constants = require('../constants');

const {
  SPA_PORT_NUMBER,
  GOOD_MYPAGE_PATH,
  BAD_MYPAGE_PATH,
  GOOD_API_PORT_NUMBER,
  BAD_API_PORT_NUMBER,
  COOKIE_API_PATH,
  END_POINT_INCREMENT,
} = constants;
const app = express();
app.use(express.static(`${__dirname}/public`));

app.get('/good/', (req, res) => {
  res.render(`${__dirname}/public/good/index.ejs`, {
    MY_PAGE_URL: `http://localhost:${SPA_PORT_NUMBER}${GOOD_MYPAGE_PATH}`,
  });
});

app.get('/good/attack.html', (req, res) => {
  res.render(`${__dirname}/public/good/attack.ejs`, {
    INCREMENT_API_URL: `http://localhost:${GOOD_API_PORT_NUMBER}${COOKIE_API_PATH}${END_POINT_INCREMENT}`,
  });
});

app.get('/bad/', (req, res) => {
  res.render(`${__dirname}/public/bad/index.ejs`, {
    MY_PAGE_URL: `http://localhost:${SPA_PORT_NUMBER}${BAD_MYPAGE_PATH}`,
  });
});

app.get('/bad/attack.html', (req, res) => {
  res.render(`${__dirname}/public/bad/attack.ejs`, {
    INCREMENT_API_URL: `http://localhost:${BAD_API_PORT_NUMBER}${COOKIE_API_PATH}${END_POINT_INCREMENT}`,
  });
});

app.listen(constants.CRACKER_PORT_NUMBER, 0, () => {
  console.log('cracker server start!');
});
