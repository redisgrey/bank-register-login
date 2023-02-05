const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,

        required: [true, "Please input your full name"],
    },

    dateOfBirth: {
        type: String,

        required: [true, "Please input your birth date"],
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

        default: "to follow",
    },

    homeAddress: {
        type: String,

        required: [true, "Please input your home address"],
    },

    gender: {
        type: String,

        required: [true, "Please input your gender"],
    },

    civilStatus: {
        type: String,

        required: [true, "Please input your civil status"],
    },

    citizenship: {
        type: String,

        required: [true, "Please input your citizenship"],
    },

    sourceOfFunds: {
        type: String,

        required: [true, "Please input your source of income"],
    },

    grossMonthlyIncome: {
        type: String,

        required: [true, "Please input your gross monthly income"],
    },

    isAdmin: {
        type: Boolean,

        default: false,
    },

    status: {
        type: String,

        default: "pending",
    },

    isInitialVerified: {
        type: Boolean,

        default: false,
    },

    isOlBankRegVerified: {
        type: Boolean,

        default: false,
    },

    isLoginVerified: {
        type: Boolean,

        default: false,
    },

    accountType: {
        type: String,

        default: "to follow",
    },

    accountNumber: {
        type: String,

        default: "to follow",
    },

    accountBalance: {
        type: Number,

        default: 0,
    },

    isEnrolledToOnlineBanking: {
        type: Boolean,

        default: false,
    },
});

module.exports = mongoose.model("User", userSchema);
