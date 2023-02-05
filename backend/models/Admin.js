const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    fullName: {
        type: String,

        required: [true, "Please input your full name"],
    },

    mobileNumber: {
        type: String,

        required: [true, "Please input your mobile number"],
    },

    emailAddress: {
        type: String,

        required: [true, "Please input your email address"],
    },

    password: {
        type: String,

        required: [true, "Please input your password"],
    },
});

module.exports = mongoose.model("Admin", adminSchema);
