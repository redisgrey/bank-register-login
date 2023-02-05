const Admin = require("../models/Admin");

const OTP = require("../models/OTPModel");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const _ = require("lodash");

const otpGenerator = require("otp-generator");

const twilio = require("twilio")(
    process.env.TWILIO_AUTH_SID,
    process.env.TWILIO_AUTH_TOKEN
);

const { protect } = require("../middlewares/authMiddleware");

const asyncHandler = require("express-async-handler");

const OTPModel = require("../models/OTPModel");

// @desc    Register Admin
// @route   POST /api/admin/register/admin
// @access  SUPER ADMIN ONLY
const registerAdmin = asyncHandler(async (req, res) => {
    let { fullName, emailAddress, password, mobileNumber } = req.body;

    if (!fullName || !emailAddress || !mobileNumber || !password) {
        res.status(400);

        throw new Error("Please add all fields");
    }

    //Check password if admin password then hash
    let adminPassword = process.env.ADMIN_PASSWORD;
    if (password === adminPassword) {
        // Hash the password
        const salt = await bcrypt.genSalt(10);

        var hashedPassword = await bcrypt.hash(password, salt);
    } else {
        res.status(400);

        throw new Error("Invalid admin data");
    }

    // Check Mobile Number Pattern
    let mobileNumberPattern = /(^(\+)(\d){12}$)/;

    if (mobileNumber.match(mobileNumberPattern)) {
        var validMobileNumber = mobileNumber;
    } else {
        res.json("Mobile number should be a valid mobile number");
    }

    // Check if user exists
    const adminExists = await Admin.findOne({ emailAddress });

    if (adminExists) {
        res.status(400);

        throw new Error("Admin already exists");
    }

    // Create Admin
    const admin = await Admin.create({
        fullName,
        emailAddress,
        password: hashedPassword,
        mobileNumber: validMobileNumber,
    });

    if (admin) {
        res.json({
            message: "Admin successfully created!",
        });
    } else {
        res.status(400);

        throw new Error("Invalid admin data");
    }
});

// @desc    Verify Super Admin
// @route   POST /api/admin/super-admin-verify
// @access  SUPER ADMIN ONLY
const verifySuperAdmin = asyncHandler(async (req, res) => {
    let { superAdminPassword } = req.body;

    if (!superAdminPassword) {
        res.status(400);

        throw new Error("Please add all fields");
    }

    //Check password if super admin password
    //let superAdminPassword = process.env.SUPER_ADMIN_PASSWORD;
    if (superAdminPassword === process.env.SUPER_ADMIN_PASSWORD) {
        res.status(201);

        res.json("Verification Successful");
    } else {
        res.status(400);

        throw new Error("Invalid super admin data");
    }
});

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = { registerAdmin, verifySuperAdmin };
