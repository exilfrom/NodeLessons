/**
 * Created by ievgen.garlinskyi on 22.11.2016.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/photo_app');

var photoSchema = new mongoose.Schema({
    name: String,
    path: String
});

module.exports = mongoose.model('Photo', photoSchema);