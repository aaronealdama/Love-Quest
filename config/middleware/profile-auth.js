module.exports = function (req, res, next) {
  if (req.user.has_profile === true) {
    return next();
  }
  return res.redirect("/");
};
