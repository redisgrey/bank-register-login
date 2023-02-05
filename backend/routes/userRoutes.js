const express = require("express");

const router = express.Router();

const { protect } = require("../middlewares/authMiddleware");

const {
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
} = require("../controllers/userController");

//*ROUTES
router.post("/register", registerUser);

router.post("/verify-number", verifyNumber);

router.post("/verify-code", verifyCode);

router.post("/login-admin", loginAdmin);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.post("/register/online-banking", registerOnlineBanking);

router.put("/update/status", protect, updateStatus);

router.get("/view-all", protect, viewAccounts);

router.put("/update/account", protect, updateAccount);

router.put("/update/profile", protect, updateProfile);

router.put("/deposit", protect, depositMoney);

router.post("/verify-deposit", protect, verifyDeposit);

router.post("/verify-depcode", protect, verifyDepCode);

router.post("/verify-withdraw", protect, verifyWithdraw);

router.post("/verify-wdrawcode", protect, verifyWdrawCode);

router.put("/withdraw", protect, withdrawMoney);

router.put("/transfer", protect, transferMoney);

router.post("/verify-transfer", protect, verifyTransfer);

router.post("/verify-transcode", protect, verifyTransCode);

router.get("/balance", protect, checkBalance);

module.exports = router;
