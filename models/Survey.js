const mongoose = require('mongoose');
const RecipientSchema = require('./Recipient');

const { Schema } = mongoose;

const surveySchema = new Schema({
  title: String,
  subject: String,
  body: String,
  recipients: [RecipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  dateSent: Date,
  lastResponded: Date,
});

const Surveys = mongoose.model('surveys', surveySchema);

module.exports = Surveys;
