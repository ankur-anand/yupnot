const router = require('express').Router();
const keys = require('../../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

router.post('/stripe', async (req, res, next) => {
  const spToken = req.body.stripe_token;
  await stripe.charges
    .create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 50 surveys',
      source: spToken.id,
    })
    .catch(err => {
      err.customMessage = `Error happened while charing user ${req.user}`;
      next(err);
    });
  req.user.credits += 50;
  const user = await req.user.save().catch(err => {
    err.customMessage = `Error happened while saving user ${req.user}`;
    next(err);
  });
  res.send(user);
});

module.exports = router;
