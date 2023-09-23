const passport = require('passport');
const User = require('../models/User');

// User Login
exports.loginForm = (req, res) => {
  res.render('user/login');
};

exports.login = async (req, res) => {
  try {
    await passport.authenticate('local', {
      successRedirect: '/users/dashboard',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// User Signup
exports.signupForm = (req, res) => {
  res.render('user/signup');
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.flash('error_msg', 'User with this email already exists');
      return res.redirect('/users/signup');
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      password
    });

    await newUser.save(); // Save user to database

    req.flash('success_msg', 'You are now registered and can log in');
    res.redirect('/users/login');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// User Logout
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    } else {
      res.redirect('/users/login');
    }
  });
};


// Display User Dashboard
exports.dashboard = async (req, res) => {
  try {
    // Check if user is authenticated
    if (req.isAuthenticated()) {
      res.render('user/dashboard');
    } else {
      res.redirect('/users/login');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
