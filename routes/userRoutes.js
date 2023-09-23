const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middlewares/auth');
const { signupForm, signup, loginForm, login, logout, dashboard } = require('../controllers/userController');

// User Signup Routes
router.get('/signup', signupForm);
router.post('/signup', signup);

// User Login Routes
router.get('/login', loginForm);
router.post('/login', login);

// User Dashboard
router.get('/dashboard', ensureAuthenticated, dashboard);

// User Logout
router.get('/logout', logout);

module.exports = router;
