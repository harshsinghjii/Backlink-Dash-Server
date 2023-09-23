const passport = require('passport');
const User = require('../models/User');

// Admin Login Form
exports.adminLoginForm = (req, res) => {
  res.render('admin/login');
};

// Admin Login
exports.adminLogin = async (req, res) => {
  try {
    await passport.authenticate('local', {
      successRedirect: '/admin/dashboard',
      failureRedirect: '/admin/login',
      failureFlash: true
    })(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Admin Signup Form
exports.adminSignupForm = (req, res) => {
  res.render('admin/signup');
};

// Admin Signup
exports.adminSignup = async (req, res) => {
  try {
    // Logic to handle admin signup
    const { name, email, password } = req.body;
    const user = new User({ name, email, password, role: 'admin' });
    await user.save();
    res.redirect('/admin/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Admin Logout
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    } else {
      res.redirect('/admin/login');
    }
  });
};

// Admin Dashboard
exports.dashboard = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      res.render('admin/dashboard');
    } else {
      res.redirect('/admin/login');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
