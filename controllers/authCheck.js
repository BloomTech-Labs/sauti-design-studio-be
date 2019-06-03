module.exports = authCheck;
function authCheck(req, res, next) {
  if (req.user && req.user.id) {
    next();
  } else {
    res.status(400).redirect("/");
  }
}
