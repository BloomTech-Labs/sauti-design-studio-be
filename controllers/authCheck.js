const jwt = require("jsonwebtoken");
const secrets = require("../config/keys");

module.exports = authCheck;
function authCheck(req, res, next) {
  const token = req.headers.authorization;
  if (!req.user && !token) {
    res.status(400).json({ message: "Please Login" });
  } else {
    jwt.verify(token, secrets.jwt.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Invalid Credentials. Please Log In" });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  }
}
