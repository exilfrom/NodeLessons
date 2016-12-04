/**
 * Created by Odin on 03.12.2016.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
mongoose.connect('mongodb://localhost/Chapter9');

var UsersSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {type: String, unique: true},
    password: String
},{versionKey: false });

UsersSchema.pre('save', function(next){
    var user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, function (err, salt) {
        if (err)
            return next(err);

        bcrypt.hash(user.password, salt, function (e, hash) {
            if (e) {
                return next(e);
            }
            user.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model('Users', UsersSchema);