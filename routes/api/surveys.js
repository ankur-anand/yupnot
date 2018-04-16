const router = require('express').Router();
const ensureCredits = require('../../middlewares/ensureCredits');
const mongoose = require('mongoose');

const Mailer = require('../../services/Mailer');
const surveyTemplate = require('../../services/emailTemplates/serveyEmail');

const Survey = mongoose.model('surveys');

router.post('/', ensureCredits, async (req, res, next) => {
  const { title, subject, body, recipients } = req.body.surveys;

  const survey = new Survey({
    title,
    subject,
    body,
    recipients: recipients.split(',').map(email => ({
      email: email.trim(),
    })),
    _user: req.user.id,
    dateSent: Date.now(),
  });

  const mailer = new Mailer(survey, surveyTemplate(survey));
  await mailer.send().catch(err => {
    err.status = 422;
    next(err);
  });

  await survey.save().catch(err => {
    next(err);
  });
  req.user.credits -= 1;

  const user = await req.user.save();

  res.send(user);
});
module.exports = router;
