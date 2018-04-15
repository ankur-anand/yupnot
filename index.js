const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const path = require('path');
const keys = require('./config/keys');

const app = express();
const PORT = process.env.PORT || 5000;

const router = require('./routes');

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

app.use(express.json());

app.use('/', router);
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT);
