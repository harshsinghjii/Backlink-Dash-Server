module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/users/login');
  },

  ensureAdmin: function(req, res, next) {
    if (req.isAuthenticated() && req.user.role == 'admin') {
      return next();
    }
    res.redirect('/admin/login');
  }
};
