const jwt = require('jsonwebtoken');

/*This authentication middleware used to check if the request coming had a user key and if it didn't it would prevent access. */

module.exports = authCheck;
function authCheck(req, res, next) {
  if (!req.user) {
    res.status(401).json({ message: 'Invalid Credentials. Please Log In' });
  } else {
    next();
  }
}
