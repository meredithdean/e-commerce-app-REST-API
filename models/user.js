const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    street: {
        type: String,
        default: ''
    },
    apartment: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    zip: {
        type: String,
        default: ''
    },
    Country: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

exports.User = mongoose.model('User', userSchema);