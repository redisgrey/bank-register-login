import axios from "axios";

// Register user
const register = async (userData) => {
    const response = await axios.post("/api/users/register", userData);

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
};

// Login user
const login = async (userData) => {
    const response = await axios.post("api/users/login", userData);

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
};

// Login Admin
const loginAdmin = async (userData) => {
    const response = await axios.post("api/users/login-admin", userData);

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
};

// Register to Online Bank
const registerOnlineBanking = async (userData) => {
    const response = await axios.post(
        "/api/users/register/online-banking",
        userData
    );

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
};

// Verify user number
const verifyNumber = async (userData) => {
    const response = await axios.post("/api/users/verify-number", userData);

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
};

// Verify otp number
const verifyOtpNumber = async (userData) => {
    const response = await axios.post("/api/users/verify-code", userData);

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
};

// Update User's Account
const updateAccount = async (userData, user) => {
    const config = {
        headers: {
            Authorization: `Bearer ${user}`,
        },
    };

    const response = await axios.put(
        "/api/users/update/account",
        userData,
        config
    );

    return response.data;
};

// Update User's Status
const updateStatus = async (userData, user) => {
    const config = {
        headers: {
            Authorization: `Bearer ${user}`,
        },
    };

    const response = await axios.put(
        "/api/users/update/status",
        userData,
        config
    );

    return response.data;
};

// Update User's Profile
const updateProfile = async (userData, user) => {
    const config = {
        headers: {
            Authorization: `Bearer ${user}`,
        },
    };

    const response = await axios.put(
        "/api/users/update/profile",
        userData,
        config
    );

    return response.data;
};

// View Accounts
const viewAccounts = async (user) => {
    const config = {
        headers: {
            Authorization: `Bearer ${user}`,
        },
    };

    const response = await axios.get("/api/users/", config);

    return response.data;
};

// Deposit Money
const depositMoney = async (userData, user) => {
    const config = {
        headers: {
            Authorization: `Bearer ${user}`,
        },
    };

    const response = await axios.put("/api/users/deposit", userData, config);

    return response.data;
};

// Verify deposit
const verifyDeposit = async (userData, user) => {
    const config = {
        headers: {
            Authorization: `Bearer ${user}`,
        },
    };

    const response = await axios.post(
        "/api/users/verify-deposit",
        userData,
        config
    );

    return response.data;
};

// Verify deposit code
const verifyDepCode = async (userData, user) => {
    const config = {
        headers: {
            Authorization: `Bearer ${user}`,
        },
    };

    const response = await axios.post(
        "/api/users/verify-depcode",
        userData,
        config
    );

    return response.data;
};

// Withdraw Money
const withdrawMoney = async (userData, user) => {
    const config = {
        headers: {
            Authorization: `Bearer ${user}`,
        },
    };

    const response = await axios.put("/api/users/withdraw", userData, config);

    return response.data;
};

// Verify Withdrawal
const verifyWithdraw = async (userData, user) => {
    const config = {
        headers: {
            Authorization: `Bearer ${user}`,
        },
    };

    const response = await axios.post(
        "/api/users/verify-withdraw",
        userData,
        config
    );

    return response.data;
};

// Verify withdrawal code
const verifyWdrawCode = async (userData, user) => {
    const config = {
        headers: {
            Authorization: `Bearer ${user}`,
        },
    };

    const response = await axios.post(
        "/api/users/verify-wdrawcode",
        userData,
        config
    );

    return response.data;
};

// Check Account Balance
const checkBalance = async (user) => {
    const config = {
        headers: {
            Authorization: `Bearer ${user}`,
        },
    };

    const response = await axios.get("/api/users/balance", config);

    return response.data;
};

// Deposit Money
const transferMoney = async (userData, user) => {
    const config = {
        headers: {
            Authorization: `Bearer ${user}`,
        },
    };

    const response = await axios.put("/api/users/transfer", userData, config);

    return response.data;
};

// Verify Transfer
const verifyTransfer = async (userData, user) => {
    const config = {
        headers: {
            Authorization: `Bearer ${user}`,
        },
    };

    const response = await axios.post(
        "/api/users/verify-transfer",
        userData,
        config
    );

    return response.data;
};

// Verify Transfer code
const verifyTransCode = async (userData, user) => {
    const config = {
        headers: {
            Authorization: `Bearer ${user}`,
        },
    };

    const response = await axios.post(
        "/api/users/verify-transcode",
        userData,
        config
    );

    return response.data;
};

// Logout User
const logout = async (user) => {
    const response = await axios.get("/api/users/logout");

    localStorage.removeItem("user");

    return response.data;
};

const authService = {
    register,
    logout,
    login,
    loginAdmin,
    verifyNumber,
    verifyOtpNumber,
    updateAccount,
    updateStatus,
    registerOnlineBanking,
    updateProfile,
    viewAccounts,
    depositMoney,
    withdrawMoney,
    transferMoney,
    checkBalance,
    verifyDeposit,
    verifyDepCode,
    verifyWithdraw,
    verifyWdrawCode,
    verifyTransfer,
    verifyTransCode,
};

export default authService;
