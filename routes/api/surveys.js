const router = require('express').Router();
const ensureCredits = require('../../middlewares/ensureCredits');
const mongoose = require('mongoose');
const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');

const Mailer = require('../../services/Mailer');
const surveyTemplate = require('../../services/emailTemplates/serveyEmail');
const ensureAuthenticated = require('../../middlewares/ensureAuthenticated');

const Survey = mongoose.model('surveys');

router.get('/:id/:yesno', (req, res) => {
  res.send('Thanks for voting');
});

router.post('/webhooks/sendgrid', (req, res) => {
  const p = new Path('/api/surveys/:surveyId/:choice');
  const events = _.map(req.body, event => {
    const pathName = new URL(event.url).pathname;
    const match = p.test(pathName);
    if (match) {
      return {
        email: event.email,
        surveyId: match.surveyId,
        choice: match.choice,
      };
    }
  });

  const compactEvents = _.compact(events);
  const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');
  _.each(uniqueEvents, event => {
    Survey.updateOne(
      {
        _id: event.surveyId,
        recipients: {
          $elemMatch: { email: event.email, responded: false },
        },
      },
      {
        $inc: { [event.choice]: 1 },
        $set: { 'recipients.$.responded': true },
        lastResponded: new Date(),
      },
    ).exec();
  });
  res.send({});
});
router.post('/', ensureAuthenticated, ensureCredits, async (req, res, next) => {
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
