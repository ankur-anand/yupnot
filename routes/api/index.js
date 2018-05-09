const router = require('express').Router();
const billing = require('./billing');
const surveys = require('./surveys');
const ensureAuthenticated = require('../../middlewares/ensureAuthenticated');

router.get('/current_user', (req, res) => {
  res.send(req.user);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.use('/billing', ensureAuthenticated, billing);
router.use('/surveys', surveys);

module.exports = router;
