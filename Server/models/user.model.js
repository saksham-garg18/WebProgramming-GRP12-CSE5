const mongoose = require('mongoose');

const userSchema = {
    name:{
        type: "string",
        required: true
    },

    email: {
        type: "string",
        format: "email",
        required: true
    },
};

const User = mongoose.model('User', userSchema);
module.exports = User;