const express = require('express');
const router = express.Router();

// Main page
router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    if (req.user.isAdmin) {
      res.redirect('/admin/dashboard');
    } else {
      res.redirect('/user/dashboard');
    }
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
