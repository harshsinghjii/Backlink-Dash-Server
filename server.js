const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
require('dotenv').config()

// Initialize Express
const app = express();

// Set up body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up session
app.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: true,
  saveUninitialized: true
}));

app.use(flash());

// Initialize Passport and session
app.use(passport.initialize());
app.use(passport.session());

// Set view engine to EJS
app.set('view engine', 'ejs');

// Import Passport configuration
require('./middlewares/passport');

// Connect MongoDB
connectDB();

// Import routes
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Use routes
app.use('/', indexRoutes);
app.use('/users', userRoutes);
app.use('/admin', adminRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
