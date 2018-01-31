const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');

const app = express();
const PORT = process.env.PORT || 5000;

const router = require('./routes/appRoutes');
require('./models/User');

mongoose.connect(keys.mongoDbURI);
require('./services/passport');

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKeys],
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/', router);
app.listen(PORT);
