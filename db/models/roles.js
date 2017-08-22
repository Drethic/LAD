// Import mongoose.js to define our schema and interact with MongoDB
var mongoose = require('mongoose');

// Import bcrypt-nodejs for hashing passwords on MongoDB
var bcrypt = require('bcrypt-nodejs');

// Define Role schema model with two fields
var rolesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Role name is required.'
    },
    description: {
        type: String,
        required: 'Role description is required.'
    }
});

// Export model via module
module.exports = {
    Roles: mongoose.model('Roles', rolesSchema)
};