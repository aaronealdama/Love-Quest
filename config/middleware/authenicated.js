module.exports = function (req, res, next) {
  console.log(req.user);
  if (req.user.has_profile === false) {
    return next();
  }
  return res.redirect("/");
};
