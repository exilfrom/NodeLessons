var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/TestDB');

var UsersSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String
},{versionKey: false });

module.exports = mongoose.model('Users', UsersSchema);