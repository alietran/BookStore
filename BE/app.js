const path = require('path');
const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const adminRouters = require('./routers/adminRouter');
const categoryRouters = require('./routers/categoryRouter');
const subCategoryRouters = require('./routers/subCategoryRouter');
const roleRouters = require('./routers/roleRouter');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const app = express();
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
require('dotenv').config();
const helmet = require('helmet');

require('./controllers/passportGoogle');

// Serving static files
// const publicPathDirectory = path.join(__dirname, 'public')
app.use(express.static(path.join(__dirname, './public')));
// app.use(express.static(`${__dirname}/public`));

// 1) Global Middleware
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 100,
  windows: 60 * 60 * 1000,
  message: 'Too many requests from this IP. Please try again in an hour!',
});
app.use('/api', limiter);

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// app.use(morgan('dev'));
// app.use(helmet());
app.use(
  cookieSession({
    name: 'session',
    keys: ['lama'],
    maxAge: 24 * 60 * 60 * 100,
    secret: '123',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);

// app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) Router
app.use('/api/v1/admins', adminRouters);
app.use('/api/v1/roles', roleRouters);
app.use('/api/v1/categories', categoryRouters);
app.use('/api/v1/subCategories', subCategoryRouters);

// trả về đường dẫn not found
app.all('*', (req, res, next) => {
  next(new AppError(`Can'n find ${req.originalUrl} on this sever!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
