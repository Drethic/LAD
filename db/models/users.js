// URL to connect to a local MongoDB with database lad.
var databaseURL = 'mongodb://localhost:27017/lad';

// Import mongoose.js to define our schema and interact with MongoDB
var mongoose = require('mongoose');

// Import bcrypt-nodejs for hashing passwords on MongoDB
var bcrypt = require('bcrypt-nodejs');

// Define User schema model with several fields
var usersSchema = new mongoose.Schema({
  userName: {type: String, required: 'Name is required'},
  email: {type: String, required: 'Email is required', unique: true},
  firstName: {type: String},
  lastName: {type: String},
  roleId: {type: Array},
  options: {type: Object},
  password: {type: String, required: 'Your password is required'},
  signupDate: {type: Date}
});

// Mongoose middleware that is called before save to hash the password
usersSchema.pre('save', function(next, err) {

  var user = this;
  var SALT_FACTOR = 10;

  // If user is not new or the password is not modified
  if (!user.isNew && !user.isModified('password')) {
    return next();
  }

  // Encrypt password before saving to database
  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {

    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

// Export model via module
module.exports = {
  Users: mongoose.model('Users', usersSchema)
};

