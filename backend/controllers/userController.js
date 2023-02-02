const User = require("../models/User");

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

// @desc    Register New User
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    let {
        fullName,
        dateOfBirth,
        emailAddress,
        password,
        mobileNumber,
        homeAddress,
        gender,
        civilStatus,
        citizenship,
        sourceOfFunds,
        grossMonthlyIncome,
        isAdmin,
    } = req.body;

    if (
        !fullName ||
        !dateOfBirth ||
        !emailAddress ||
        !password ||
        !mobileNumber ||
        !homeAddress ||
        !gender ||
        !civilStatus ||
        !citizenship ||
        !sourceOfFunds ||
        !grossMonthlyIncome
    ) {
        res.status(400);

        throw new Error("Please add all fields");
    }

    // Check password if admin password then hash
    let adminPassword = process.env.ADMIN_PASSWORD;
    if (password === adminPassword) {
        // Hash the password
        const salt = await bcrypt.genSalt(10);

        var hashedPassword = await bcrypt.hash(password, salt);

        //set isAdmin to true
        isAdmin = true;
    }

    // Check password pattern
    let passwordFormat =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

    if (password.match(passwordFormat) && password !== adminPassword) {
        // Hash the password
        const salt = await bcrypt.genSalt(10);

        var hashedPassword = await bcrypt.hash(password, salt);
    } else {
        res.json(
            "Password should be between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"
        );
    }

    // Check Mobile Number Pattern
    let mobileNumberPattern = /(^(\+)(\d){12}$)/;

    if (mobileNumber.match(mobileNumberPattern)) {
        var validMobileNumber = mobileNumber;
    } else {
        res.json("Mobile number should be a valid mobile number");
    }

    // Check if user exists
    const userExists = await User.findOne({ emailAddress });

    if (userExists) {
        res.status(400);

        throw new Error("User already exists");
    }

    // Create User
    const user = await User.create({
        fullName,
        dateOfBirth,
        emailAddress,
        password: hashedPassword,
        mobileNumber: validMobileNumber,
        homeAddress,
        gender,
        civilStatus,
        citizenship,
        sourceOfFunds,
        grossMonthlyIncome,
        isAdmin,
    });

    if (user) {
        res.json({
            message: "Account successfully created!",
        });
    } else {
        res.status(400);

        throw new Error("Invalid user data");
    }
});

// @desc    Verify New User
// @route   POST /api/users/verify-number
// @access  Private
const verifyNumber = asyncHandler(async (req, res) => {
    let { mobileNumber } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ mobileNumber: mobileNumber });

    if (userExists && userExists.isVerified === false) {
        const OTP = otpGenerator.generate(6, {
            digits: true,
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        const number = mobileNumber;

        // console.log(OTP);

        twilio.messages
            .create({
                body: `Your OTRBN Verification code is ${OTP}`,
                from: process.env.TWILIO_AUTH_NUMBER,
                to: number,
            })
            .then((message) => console.log(message.sid));

        const otp = new OTPModel({ number: number, otp: OTP });

        const salt = await bcrypt.genSalt(10);

        otp.otp = await bcrypt.hash(otp.otp, salt);

        const result = await otp.save();

        res.status(201).json({
            number,
        });
    } else {
        res.status(400);

        throw new Error("Invalid mobile number or user already verified");
    }
});

// @desc    Verify New User
// @route   POST /api/users/verify-code
// @access  Private
const verifyCode = asyncHandler(async (req, res) => {
    let { otpNumber } = req.body;

    const otpHolder = await OTPModel.find({ otpNumber: otpNumber });

    if (otpHolder.length === 0) {
        res.json("You input an expired OTP number");
    }

    const rightOtpFind = otpHolder[otpHolder.length - 1];

    const validUser = await bcrypt.compare(otpNumber, rightOtpFind.otp);

    if (validUser) {
        // isVerify User
        const updateVerify = await User.updateOne(
            { mobileNumber: rightOtpFind.number },
            { $set: { isVerified: true } }
        );

        const OTPDelete = OTPModel.deleteMany({
            number: rightOtpFind.number,
        });

        res.json("Verification Successful!");
    } else {
        // const accountDelete = User.deleteOne({
        //     number: mobileNumber,
        // });

        res.json("You input an invalid mobile number / OTP number");
    }
});

// @desc    Update user status
// @route   PUT /api/users/update/status
// @access  Private(admin)
const updateStatus = asyncHandler(async (req, res) => {
    let { emailAddress, status } = req.body;

    // Authenticate User
    // const user = await User.findOne({ emailAddress });

    const userToUpdate = await User.findOne({ emailAddress: emailAddress });

    if (!userToUpdate) {
        res.status(404);

        throw new Error("User to update not found");
    }

    if (
        protect
        // user &&
        // password === process.env.ADMIN_PASSWORD &&
        // user.isAdmin === true &&
        // user.isVerified === true
    ) {
        const userUpdate = await User.updateOne(
            { emailAddress: emailAddress },
            { $set: { status: status } }
        );

        res.json(`${userToUpdate.fullName}'s status is updated to ${status}`);
    } else {
        res.status(400);

        throw new Error("User is not authorized");
    }
});

// @desc    Update user account type and number
// @route   PUT /api/users/update/account
// @access  Private(admin)
const updateAccount = asyncHandler(async (req, res) => {
    let { id, accountType, accountNumber } = req.body;

    // Authenticate User
    // const user = await User.findOne({ emailAddress });

    const userToUpdate = await User.findOne({ _id: id });

    if (!userToUpdate) {
        res.status(404);

        throw new Error("User to update not found");
    }

    if (
        protect
        // user &&
        // password === process.env.ADMIN_PASSWORD &&
        // user.isAdmin === true &&
        // user.isVerified === true
    ) {
        const userAccountUpdate = await User.updateOne(
            { _id: id },
            { $set: { accountType: accountType, accountNumber: accountNumber } }
        );

        res.json(`${userToUpdate.fullName}'s account is now updated`);
    } else {
        res.status(400);

        throw new Error("User is not authorized");
    }
});

// @desc    Register User to Online Banking
// @route   POST /api/users/register/online-banking
// @access  Public
// * email address
// * password
// * account number
const registerOnlineBanking = asyncHandler(async (req, res) => {
    const { fullName, accountType, emailAddress, password, accountNumber } =
        req.body;

    if (
        !emailAddress ||
        !password ||
        !accountNumber ||
        !fullName ||
        !accountType
    ) {
        res.status(400);

        throw new Error("Please add all fields");
    }

    const user = await User.findOne({ accountNumber: accountNumber });

    if (
        user &&
        (await bcrypt.compare(password, user.password)) &&
        user.accountNumber === accountNumber
    ) {
        const userEnrollOB = await User.updateOne(
            { emailAddress: emailAddress },
            { $set: { isEnrolledToOnlineBanking: true } }
        );

        res.json(
            `${user.fullName} is now enrolled to Online Banking. Please use your email address and password to login. Thank you!`
        );
    } else {
        res.status(400);

        throw new Error("Invalid credentials");
    }
});

// @desc    Login user not admin (Online Banking)
// @route   POST /api/users/login
// @access  Public
// * email address
// * password
const loginUser = asyncHandler(async (req, res) => {
    const { emailAddress, password } = req.body;

    if (!emailAddress || !password) {
        res.status(400);

        throw new Error("Please add all fields");
    }

    const user = await User.findOne({ emailAddress: emailAddress });

    if (
        user &&
        (await bcrypt.compare(password, user.password)) &&
        user.isEnrolledToOnlineBanking === true &&
        user.isVerified === true
    ) {
        res.json({
            id: user.id,
            token: generateToken(user._id),
            accountNumber: user.accountNumber,
            accountType: user.accountType,
        });
    } else {
        res.status(400);

        throw new Error("Invalid credentials");
    }
});

// @desc    Logout User
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(" ")[1];

            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token
            const user = await User.findById(decoded.id).select("-password");

            await User.updateOne(
                { id: user._id },
                { $set: { authDeposit: false } }
            );

            await User.updateOne(
                { id: user._id },
                { $set: { authWithdraw: false } }
            );

            await User.updateOne(
                { id: user._id },
                { $set: { authTransfer: false } }
            );

            await User.updateOne(
                { id: user._id },
                { $set: { isVerified: false } }
            );

            res.json("User successfully logged out!");
        } catch (error) {
            console.log(error);

            res.status(401);

            throw new Error("Not Authorized");
        }
    }
});

// @desc    Login user admin
// @route   POST /api/users/login-admin
// @access  Public
// * with secret password
const loginAdmin = asyncHandler(async (req, res) => {
    let { emailAddress, password } = req.body;

    const user = await User.findOne({ emailAddress });

    // Authenticate if admin
    if (
        user &&
        user.isAdmin === true &&
        user.isVerified === true &&
        password === process.env.ADMIN_PASSWORD
    ) {
        res.json({ id: user.id, token: generateToken(user._id) });
    } else {
        res.status(400);

        throw new Error("Invalid credentials");
    }
});

// @desc    Get all users
// @route   GET /api/users/
// @access  Private(admin)
const viewAccounts = asyncHandler(async (req, res) => {
    let { emailAddress, password } = req.body;

    // Validate User
    const user = await User.findOne({ emailAddress });

    if (
        protect &&
        user &&
        password === process.env.ADMIN_PASSWORD &&
        user.isAdmin === true &&
        user.isVerified === true
    ) {
        const usersNotAdmin = await User.find(
            { isAdmin: false },
            { password: 0 }
        );

        res.json(usersNotAdmin);
    }
});

// @desc    Update user profile
// @route   PUT /api/users/update/profile
// @access  Private(user)
const updateProfile = asyncHandler(async (req, res) => {
    let {
        emailAddress,
        fullName,
        dateOfBirth,
        mobileNumber,
        newPassword,
        homeAddress,
        civilStatus,
        citizenship,
        sourceOfFunds,
        grossMonthlyIncome,
    } = req.body;

    if (
        !fullName &&
        !dateOfBirth &&
        !mobileNumber &&
        !newPassword &&
        !homeAddress &&
        !civilStatus &&
        !citizenship &&
        !sourceOfFunds &&
        !grossMonthlyIncome
    ) {
        res.json({ message: "Please input field/s you want to update" });
    }

    // Authenticate User
    // const user = await User.findOne({ emailAddress });

    if (
        protect
        // user &&
        // user.isVerified === true &&
        // (await bcrypt.compare(password, user.password))
    ) {
        if (typeof fullName !== "undefined") {
            await User.updateOne(
                { emailAddress: emailAddress },
                { $set: { fullName: fullName } }
            );
        }
        if (typeof dateOfBirth !== "undefined") {
            await User.updateOne(
                { emailAddress: emailAddress },
                { $set: { dateOfBirth: dateOfBirth } }
            );
        }
        if (typeof mobileNumber !== "undefined") {
            // Check Mobile Number Pattern
            let mobileNumberPattern = /(^(\+)(\d){12}$)|(^\d{11}$)/;

            if (mobileNumber.match(mobileNumberPattern)) {
                var validMobileNumber = mobileNumber;
            } else {
                res.json("Mobile number should be a valid mobile number");
            }

            await User.updateOne(
                { emailAddress: emailAddress },
                { $set: { mobileNumber: validMobileNumber } }
            );
        }
        if (typeof newPassword !== "undefined") {
            // Check password pattern
            let passwordFormat =
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

            if (newPassword.match(passwordFormat)) {
                // Hash the password
                const salt = await bcrypt.genSalt(10);

                var hashedPassword = await bcrypt.hash(newPassword, salt);
            } else {
                res.json(
                    "Password should be between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"
                );
            }

            await User.updateOne(
                { emailAddress: emailAddress },
                { $set: { password: hashedPassword } }
            );
        }
        if (typeof homeAddress !== "undefined") {
            await User.updateOne(
                { emailAddress: emailAddress },
                { $set: { homeAddress: homeAddress } }
            );
        }
        if (typeof civilStatus !== "undefined") {
            await User.updateOne(
                { emailAddress: emailAddress },
                { $set: { civilStatus: civilStatus } }
            );
        }
        if (typeof citizenship !== "undefined") {
            await User.updateOne(
                { emailAddress: emailAddress },
                { $set: { citizenship: citizenship } }
            );
        }
        if (typeof sourceOfFunds !== "undefined") {
            await User.updateOne(
                { emailAddress: emailAddress },
                { $set: { sourceOfFunds: sourceOfFunds } }
            );
        }
        if (typeof grossMonthlyIncome !== "undefined") {
            await User.updateOne(
                { emailAddress: emailAddress },
                { $set: { grossMonthlyIncome: grossMonthlyIncome } }
            );
        }

        res.json(`${user.fullName}'s account is now updated`);
    } else {
        res.status(400);

        throw new Error("User is not authorized");
    }
});

// @desc    Deposit Money
// @route   PUT /api/users/deposit
// @access  Private(user)
const depositMoney = asyncHandler(async (req, res) => {
    let { amount } = req.body;

    let token;

    if (
        protect &&
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(" ")[1];

            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token
            const user = await User.findById(decoded.id).select("-password");

            const newAccountBalance = user.accountBalance + parseFloat(amount);

            // if (user.authDeposit === true) {
            await User.updateOne(
                { accountNumber: user.accountNumber },
                { $set: { accountBalance: newAccountBalance } }
            );

            res.json("You have successfully deposited to your account!");
            // } else {
            //     res.json("You are not authorized");
            // }
        } catch (error) {
            console.log(error);

            res.status(401);

            throw new Error("Not Authorized");
        }
    }
});

// @desc    Verify Deposit
// @route   POST /api/users/verify-deposit
// @access  Private
const verifyDeposit = asyncHandler(async (req, res) => {
    let token;

    if (
        protect &&
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(" ")[1];

            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token
            const user = await User.findById(decoded.id).select("-password");

            const OTP = otpGenerator.generate(6, {
                digits: true,
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });

            const number = user.mobileNumber;

            twilio.messages
                .create({
                    body: `Your OTRBN Verification code is ${OTP}`,
                    from: process.env.TWILIO_AUTH_NUMBER,
                    to: number,
                })
                .then((message) => console.log(message.sid));

            const otp = new OTPModel({ number: number, otp: OTP });

            const salt = await bcrypt.genSalt(10);

            otp.otp = await bcrypt.hash(otp.otp, salt);

            const result = await otp.save();

            res.status(201).json({
                message: "OTP sent successfully!",
            });
        } catch (error) {
            console.log(error);

            res.status(401);

            throw new Error("Not Authorized");
        }
    }
});

// @desc    Verify Deposit Code
// @route   POST /api/users/verify-depcode
// @access  Private
const verifyDepCode = asyncHandler(async (req, res) => {
    let { otpNumber } = req.body;

    let token;

    if (
        protect &&
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(" ")[1];

            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token
            const user = await User.findById(decoded.id).select("-password");

            const number = user.mobileNumber;

            const otpHolder = await OTPModel.find({
                mobileNumber: number,
            });

            if (otpHolder.length === 0) {
                res.json("You input an expired OTP number");
            }

            const rightOtpFind = otpHolder[otpHolder.length - 1];

            const validUser = await bcrypt.compare(otpNumber, rightOtpFind.otp);

            if (rightOtpFind.number === number && validUser) {
                // isVerify User
                const verifyDepCode = await User.updateOne(
                    { mobileNumber: number },
                    { $set: { authDeposit: true } }
                );

                const OTPDelete = OTPModel.deleteMany({
                    number: number,
                });

                res.json("Deposit Verification Successful!");
            } else {
                res.json("You input an invalid mobile number / OTP number");
            }
        } catch (error) {
            console.log(error);

            res.status(401);

            throw new Error("Not Authorized");
        }
    }
});

// @desc    Verify Withdrawal
// @route   POST /api/users/verify-withdraw
// @access  Private
const verifyWithdraw = asyncHandler(async (req, res) => {
    let token;

    if (
        protect &&
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(" ")[1];

            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token
            const user = await User.findById(decoded.id).select("-password");

            const OTP = otpGenerator.generate(6, {
                digits: true,
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });

            const number = user.mobileNumber;

            twilio.messages
                .create({
                    body: `Your OTRBN Verification code is ${OTP}`,
                    from: process.env.TWILIO_AUTH_NUMBER,
                    to: number,
                })
                .then((message) => console.log(message.sid));

            const otp = new OTPModel({ number: number, otp: OTP });

            const salt = await bcrypt.genSalt(10);

            otp.otp = await bcrypt.hash(otp.otp, salt);

            const result = await otp.save();

            res.status(201).json({
                message: "OTP sent successfully!",
            });
        } catch (error) {
            console.log(error);

            res.status(401);

            throw new Error("Not Authorized");
        }
    }
});

// @desc    Verify Withdrawal Code
// @route   POST /api/users/verify-wdrawcode
// @access  Private
const verifyWdrawCode = asyncHandler(async (req, res) => {
    let { otpNumber } = req.body;

    let token;

    if (
        protect &&
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(" ")[1];

            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token
            const user = await User.findById(decoded.id).select("-password");

            const number = user.mobileNumber;

            const otpHolder = await OTPModel.find({
                mobileNumber: number,
            });

            if (otpHolder.length === 0) {
                res.json("You input an expired OTP number");
            }

            const rightOtpFind = otpHolder[otpHolder.length - 1];

            const validUser = await bcrypt.compare(otpNumber, rightOtpFind.otp);

            if (rightOtpFind.number === number && validUser) {
                // isVerify User
                await User.updateOne(
                    { mobileNumber: number },
                    { $set: { authWithdraw: true } }
                );

                OTPModel.deleteMany({
                    number: number,
                });

                res.json("Withdrawal Verification Successful!");
            } else {
                res.json("You input an invalid mobile number / OTP number");
            }
        } catch (error) {
            console.log(error);

            res.status(401);

            throw new Error("Not Authorized");
        }
    }
});

// @desc    Withdraw Money
// @route   PUT /api/users/withdraw
// @access  Private(user)
const withdrawMoney = asyncHandler(async (req, res) => {
    let { amount } = req.body;

    let token;

    if (
        protect &&
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(" ")[1];

            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token
            const user = await User.findById(decoded.id).select("-password");

            const newAccountBalance = user.accountBalance - parseFloat(amount);

            if (user.authWithdraw === true) {
                await User.updateOne(
                    { accountNumber: user.accountNumber },
                    { $set: { accountBalance: newAccountBalance } }
                );

                res.json("You have successfully withdraw from your account!");
            } else {
                res.json("You are not authorized");
            }
        } catch (error) {
            console.log(error);

            res.status(401);

            throw new Error("Not Authorized");
        }
    }
});

// @desc    Check Account Balance
// @route   GET /api/users/balance
// @access  Private(user)
const checkBalance = asyncHandler(async (req, res) => {
    let token;

    if (
        protect &&
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(" ")[1];

            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token
            const user = await User.findById(decoded.id).select("-password");

            res.json({
                token: generateToken(user._id),
                mobileNumber: user.mobileNumber,
                accountBalance: user.accountBalance,
            });
        } catch (error) {
            console.log(error);

            res.status(401);

            throw new Error("Not Authorized");
        }
    }
});

// @desc    Transfer Money
// @route   PUT /api/users/transfer
// @access  Private(user)
const transferMoney = asyncHandler(async (req, res) => {
    let { emailAddress, amount } = req.body;

    let token;

    if (
        protect &&
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(" ")[1];

            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token
            const user = await User.findById(decoded.id).select("-password");

            const userSender = await User.findOne({
                accountNumber: user.accountNumber,
            });

            const userReceiver = await User.findOne({
                emailAddress: emailAddress,
            });

            if (!userReceiver) {
                res.status(404).json("Receiver not found");
            }

            const newSenderAccountBalance =
                userSender.accountBalance - parseFloat(amount);

            const newReceiverAccountBalance =
                userReceiver.accountBalance + parseFloat(amount);

            if (user.authTransfer === true) {
                await User.updateOne(
                    { accountNumber: user.accountNumber },
                    { $set: { accountBalance: newSenderAccountBalance } }
                );

                await User.updateOne(
                    { emailAddress: emailAddress },
                    { $set: { accountBalance: newReceiverAccountBalance } }
                );

                res.json(
                    "You have successfully transferred from your account!"
                );
            } else {
                res.status(400);

                throw new Error("User is not authorized");
            }
        } catch (error) {
            console.log(error);

            res.status(401);

            throw new Error("Not Authorized");
        }
    }
});

// @desc    Verify Transfer
// @route   POST /api/users/verify-transfer
// @access  Private
const verifyTransfer = asyncHandler(async (req, res) => {
    let token;

    if (
        protect &&
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(" ")[1];

            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token
            const user = await User.findById(decoded.id).select("-password");

            const OTP = otpGenerator.generate(6, {
                digits: true,
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });

            const number = user.mobileNumber;

            twilio.messages
                .create({
                    body: `Your OTRBN Verification code is ${OTP}`,
                    from: process.env.TWILIO_AUTH_NUMBER,
                    to: number,
                })
                .then((message) => console.log(message.sid));

            const otp = new OTPModel({ number: number, otp: OTP });

            const salt = await bcrypt.genSalt(10);

            otp.otp = await bcrypt.hash(otp.otp, salt);

            const result = await otp.save();

            res.status(201).json({
                message: "OTP sent successfully!",
            });
        } catch (error) {
            console.log(error);

            res.status(401);

            throw new Error("Not Authorized");
        }
    }
});

// @desc    Verify Transfer Code
// @route   POST /api/users/verify-transcode
// @access  Private
const verifyTransCode = asyncHandler(async (req, res) => {
    let { otpNumber } = req.body;

    let token;

    if (
        protect &&
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(" ")[1];

            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token
            const user = await User.findById(decoded.id).select("-password");

            const number = user.mobileNumber;

            const otpHolder = await OTPModel.find({
                mobileNumber: number,
            });

            if (otpHolder.length === 0) {
                res.json("You input an expired OTP number");
            }

            const rightOtpFind = otpHolder[otpHolder.length - 1];

            const validUser = await bcrypt.compare(otpNumber, rightOtpFind.otp);

            if (rightOtpFind.number === number && validUser) {
                // isVerify User
                await User.updateOne(
                    { mobileNumber: number },
                    { $set: { authTransfer: true } }
                );

                OTPModel.deleteMany({
                    number: number,
                });

                res.json("Transfer Verification Successful!");
            } else {
                res.json("You input an invalid mobile number / OTP number");
            }
        } catch (error) {
            console.log(error);

            res.status(401);

            throw new Error("Not Authorized");
        }
    }
});

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = {
    registerUser,
    verifyNumber,
    verifyCode,
    updateStatus,
    loginAdmin,
    updateAccount,
    registerOnlineBanking,
    loginUser,
    viewAccounts,
    updateProfile,
    depositMoney,
    withdrawMoney,
    transferMoney,
    checkBalance,
    logoutUser,
    verifyDeposit,
    verifyDepCode,
    verifyWithdraw,
    verifyWdrawCode,
    verifyTransfer,
    verifyTransCode,
};
