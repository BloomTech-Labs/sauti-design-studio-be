const jwt = require('jsonwebtoken');

module.exports = authCheck;
function authCheck(req, res, next) {
  if (!req.user) {
    res.status(401).json({ message: 'Invalid Credentials. Please Log In' });
  } else {
    next();
  }
}
