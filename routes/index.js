const express = require('express');
const router = express.Router();

// Main page
router.get('/', (req, res) => {
  res.render('index');
});

router.post('/index', (req, res) => {
  const { role } = req.body;
  if (role === 'admin') {
    res.redirect('/admin/login');
  } else if (role === 'user') {
    res.redirect('/users/login');
  } else {
    res.redirect('/');
  }
});

module.exports = router;
