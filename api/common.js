const constants = require('../constants');

function authenticate(name, password) {
  const user = constants.USERS.filter(u => u.name === name)[0];
  if (!user) return null;
  return user.password === password ? user : null;
}

function apiResponse(res, statusCode, body) {
  res.status(statusCode);
  res.send(body);
  res.end();
}

const apiLogics = {
  getUser: (req, res) => {
    const {user, count} = req.session;
    const currentCount = count || 0;
    if (user) {
      apiResponse(res, 200, {result: {name: user.name, count: currentCount}});
    } else {
      apiResponse(res, 401, {result: null});
    }
  },
  postLogin: (req, res) => {
    const {userName, password} = req.body;
    const user = authenticate(userName, password);
    if (user) {
      req.session.regenerate(() => {
        req.session.user = user;
        req.session.cookie.maxAge = 600 * 1000;
        apiResponse(res, 200, {result: 'ok'});
      });
    } else {
      apiResponse(res, 401, {result: 'error'});
    }
  },
  getLogout: (req, res) => {
    req.session.destroy(() => {
      apiResponse(res, 200, {result: 'ok'});
    });
  },
  postIncrement: (req, res) => {
    const {user} = req.session;
    const {amount} = req.body;
    if (user) {
      const currentCount = req.session.count || 0;
      req.session.regenerate(() => {
        req.session.user = user;
        req.session.count = currentCount + Number(amount);
        req.session.cookie.maxAge = 600 * 1000;
        apiResponse(res, 200, {result: 'ok'});
      });
    } else {
      apiResponse(res, 401, {result: 'error'});
    }
  },
  postCountReset: (req, res) => {
    const {user} = req.session;
    if (user) {
      req.session.regenerate(() => {
        req.session.user = user;
        req.session.count = 0;
        req.session.cookie.maxAge = 600 * 1000;
        apiResponse(res, 200, {result: 'ok'});
      });
    } else {
      apiResponse(res, 401, {result: 'error'});
    }
  },
};

module.exports.apiResponse = apiResponse;
module.exports.apiLogics = apiLogics;
