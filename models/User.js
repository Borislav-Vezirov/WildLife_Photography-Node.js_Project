const mongoose = require('mongoose');

const namePattern  = /^[A-Za-z]+$/;
const emailPattern = /^[a-z]+@[a-z]+\.[a-z]+$/;

const userSchema = new mongoose.Schema({
    fname    : {type: String, minlength: [3, 'First name must contain more than 3 characters'], validate: {
        validator(value){
            return namePattern.test(value);
        },
        message: 'First name must contains only english letters!'
    }},
    lname    : {type: String, minlength: [5, 'Last name must contain more than 5 characters'], validate: {
        validator(value){
            return namePattern.test(value);
        },
        message: 'Last name must contains only english letters!'
    }},
    email    : {type: String, required: [true, 'Email is required!'], validate: {
        validator(value){
            return emailPattern.test(value);
        },
        message: 'Email must be valid and must contains only english letters!'
    }},
    password : {type: String, minlength: [4, 'Password must contain more than 4 characters']}
});

userSchema.index({ email: 1 }, {
    unique: true,
    collation: {
        locale  : 'en',
        strength : 2
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;