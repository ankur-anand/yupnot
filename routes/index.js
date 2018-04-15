const router = require('express').Router();

const api = require('./api');
const auth = require('./auth');

router.use('/api', api);
router.use('/auth', auth);
module.exports = router;
