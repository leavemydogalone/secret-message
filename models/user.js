var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  last_name: { type: String, required: true, maxLength: 100 },
  email: { type: String, required: true, maxLength: 100 },
  password: { type: String, required: true, maxLength: 100 },
  is_a_member: { type: Boolean, required: true },
  is_admin: { type: Boolean },
});

UserSchema.virtual('name').get(function () {
  return this.first_name + this.last_name;
});

//Export model
module.exports = mongoose.model('User', UserSchema);
