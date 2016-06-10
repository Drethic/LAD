
// Import async.js - utility library for handlng asynchronous calls
var async = require('async');

// URL to connect to a local MongoDB with database lad.
var databaseURL = 'mongodb://localhost:27017/lad';

// Import native MongoDB client for Node.js
var MongoClient = require('mongodb').MongoClient;

// Import mongoose.js to define our schema and interact with MongoDB
var mongoose = require('mongoose');

// Import bcrypt-nodejs for hashing passwords on MongoDB
var bcrypt = require('bcrypt-nodejs');

var rolesSeed = [
  {name: 'user', description: 'Default group for all users.'},
  {name: 'admin', description: 'Group for game administrators.'}
];

var usersSeed = [
  {userName: 'Drethic', email: 'drethic@test.com', password: 'password1', firstName: 'Joe', lastName: 'Robinson', roleId: [], options: {}},
  {userName: 'm1sf17', email: 'm1sf17@test.com', password: 'password1', firstName: 'Mike', lastName: 'Flowers', roleId: [], options: {}}
];

// Define User schema model with 3 fields: user, email, password
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

var rolesSchema = new mongoose.Schema({
  name: {type: String, required: 'Role name is required.'},
  description: {type: String, required: 'Role description is required.'}
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

var Users = mongoose.model('Users', usersSchema);
var Roles = mongoose.model('Roles', rolesSchema);

function asyncFunction1(callback) {
  MongoClient.connect(databaseURL, function(err, db) {

    if (err) {
      throw err;
    }

    // Drop database which is an asynchronous call
    db.dropDatabase(function(err, result) {

      // After successfully dropping database, force
      // close database which is another asynchronous call
      db.close(true, function(err, result) {

        // Close successful so execute callback so second
        // function in async.serial gets called
        callback(null, 'SUCCESS - dropped database');
      });
    });
  });
}

function asyncFunction2(callback) {
  // Open connection to MongoDB
  mongoose.connect(databaseURL);

  // Need to listen to 'connected' event then execute callback method
  // to call the next set of code in the async.serial array
  mongoose.connection.on('connected', function(){
    console.log('db connected via mongoose');

    // Execute callback now we have a successful connection to the DB
    // and move on to the third function below in async.series
    callback(null, 'SUCCESS - Connected to mongodb');
  });
}

function asyncFunction3(callback) {
  asyncEachFunction(rolesSeed, Roles, callback);
  asyncEachFunction(usersSeed, Users, callback);
}

function asyncEachFunction(seed, schema, callback) {
  var seeds = [];
  for (i = 0; i < seed.length; i++) {
    var seedData = new schema(seed[i]);
    seeds.push(seedData);
  }

  async.eachSeries(

    // 1st parameter is the 'seeds' array to iterate over
    seeds,

    // 2nd parameter is a function takes each seedData in the 'seeds' array
    // as an argument and a callback function that needs to be executed
    // when the asynchronous call complete.

    // Note there is another 'callback' method here called 'dataSavedCallBack'.
    // 'dataSavedCallBack' needs to be called to inform async.eachSeries to
    // move on to the next seedData object in the 'seeds' array. Do not mistakenly
    // call 'callback' defined in line 130.
    function(seedData, dataSavedCallBack){

      // There is no need to make a call to create the 'lad' database.
      // Saving a model will automatically create the database
      seedData.save(function(err) {

        if (err) {
          // Send JSON response to console for errors
          console.dir(err);
        }

        // Print out which user we are saving
        console.log('Saving record');

        // Call 'userSavedCallBack' and NOT 'callback' to ensure that the next
        // 'user' item in the 'seeds' array gets called to be saved to the database
        dataSavedCallBack();
      });

    },

    // 3rd parameter is a function to call when all seeds in 'seeds' array have
    // completed their asynchronous user.save function
    function(err){

      if (err) {
        console.dir(err);
      }

      console.log("Finished aysnc.each in seeding db");

      // Execute callback function to signal to async.series that
      // all asynchronous calls are now done
      callback(null, 'SUCCESS - Seed database');

    }
  );
}

// Async series method to make sure asynchronous calls below run sequentially
async.series([

  // First function - connect to MongoDB, then drop the database
  function(callback) {
    asyncFunction1(callback);
  },

  // Second function - connect to MongoDB using mongoose, which is an asynchronous call
  function(callback) {
    asyncFunction2(callback);
  },

  // Third function - use Mongoose to create a User model and save it to database
  function(callback) {
    asyncFunction3(callback);
  }
],

// This function executes when everything above is done
function(err, results){

  console.log("\n\n--- Database seed progam completed ---");

  if (err) {
    console.log("Errors = ");
    console.dir(errors);
  } else {
    console.log("Results = ");
    console.log(results);
  }

  console.log("\n\n--- Exiting database seed progam ---");
  // Exit the process to get back to terrminal console
  process.exit(0);
});