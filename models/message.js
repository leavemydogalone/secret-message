var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MessageSchema = new Schema({
  title: { type: String, required: true, maxLength: 100 },
  message: { type: String, required: true, maxLength: 1000 },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  timeStamp: { type: Date, required: true },
});

//Export model
module.exports = mongoose.model('Message', MessageSchema);
