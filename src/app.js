const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const methodOverride = require('method-override')

const app = express()

app.use(express.json())

require("dotenv").config();

require('./db/db');

const PORT = process.env.PORT || 3000

const publicDirectory = path.join(__dirname, '../public')

app.use(express.static(publicDirectory))

app.use(cookieParser('secret'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
);

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

const routes = require('./routes')
app.use('/', routes)

app.listen(PORT, () => {
    console.log('Server listening on port', PORT)
})
