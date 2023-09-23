const express = require('express');
const router = express.Router();
const { adminLoginForm, adminLogin, adminSignupForm, adminSignup, dashboard, logout } = require('../controllers/adminController');
const { ensureAuthenticated, ensureAdmin } = require('../middlewares/auth');

// Admin Login
router.get('/login', adminLoginForm);
router.post('/login', adminLogin);

// Admin Signup
router.get('/signup', adminSignupForm);
router.post('/signup', adminSignup);

// Admin Dashboard
router.get('/dashboard', ensureAuthenticated, ensureAdmin, dashboard);

// Admin Logout
router.get('/logout', logout);

module.exports = router;
