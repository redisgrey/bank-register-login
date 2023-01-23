import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import authService from "./authService";

// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// Register user
export const register = createAsyncThunk(
    "auth/register",
    async (user, thunkAPI) => {
        try {
            return await authService.register(user);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
    try {
        return await authService.login(user);
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();

        return thunkAPI.rejectWithValue(message);
    }
});

// Login admin
export const loginAdmin = createAsyncThunk(
    "auth/login-admin",
    async (user, thunkAPI) => {
        try {
            return await authService.loginAdmin(user);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Register to Online Banking
export const registerOnlineBanking = createAsyncThunk(
    "auth/register-online",
    async (user, thunkAPI) => {
        try {
            return await authService.registerOnlineBanking(user);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Verify user number
export const verifyNumber = createAsyncThunk(
    "auth/verify-number",
    async (user, thunkAPI) => {
        try {
            return await authService.verifyNumber(user);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Verify otp number
export const verifyOtpNumber = createAsyncThunk(
    "auth/verify-code",
    async (user, thunkAPI) => {
        try {
            return await authService.verifyOtpNumber(user);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Verify Deposit
export const verifyDeposit = createAsyncThunk(
    "auth/verify-deposit",
    async (user, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await authService.verifyDeposit(user, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Verify Deposit Code
export const verifyDepCode = createAsyncThunk(
    "auth/verify-depcode",
    async (user, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await authService.verifyDepCode(user, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Verify Withdraw
export const verifyWithdraw = createAsyncThunk(
    "auth/verify-withdraw",
    async (user, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await authService.verifyWithdraw(user, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Verify Withdrawal Code
export const verifyWdrawCode = createAsyncThunk(
    "auth/verify-wdrawcode",
    async (user, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await authService.verifyWdrawCode(user, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Verify Transfer
export const verifyTransfer = createAsyncThunk(
    "auth/verify-transfer",
    async (user, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await authService.verifyTransfer(user, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Verify Transfer Code
export const verifyTransCode = createAsyncThunk(
    "auth/verify-transcode",
    async (user, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await authService.verifyTransCode(user, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Update user account (admin)
export const updateAccount = createAsyncThunk(
    "auth/update-account",
    async (user, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await authService.updateAccount(user, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Update user status (admin)
export const updateStatus = createAsyncThunk(
    "auth/update-status",
    async (user, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await authService.updateStatus(user, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Update user profile (user)
export const updateProfile = createAsyncThunk(
    "auth/update-profile",
    async (user, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await authService.updateProfile(user, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Deposit Money (user)
export const depositMoney = createAsyncThunk(
    "auth/deposit",
    async (user, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await authService.depositMoney(user, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Withdraw Money (user)
export const withdrawMoney = createAsyncThunk(
    "auth/withdraw",
    async (user, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await authService.withdrawMoney(user, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Check Account Balance (user)
export const checkBalance = createAsyncThunk(
    "auth/balance",
    async (user, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await authService.checkBalance(user, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Transfer Money (user)
export const transferMoney = createAsyncThunk(
    "auth/transfer",
    async (user, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await authService.transferMoney(user, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const logout = createAsyncThunk("auth/logout", async () => {
    await authService.logout();
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(loginAdmin.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginAdmin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(loginAdmin.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(registerOnlineBanking.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerOnlineBanking.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(registerOnlineBanking.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(verifyNumber.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(verifyNumber.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(verifyNumber.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(verifyOtpNumber.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(verifyOtpNumber.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(verifyOtpNumber.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(updateAccount.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateAccount.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(updateAccount.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(updateStatus.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateStatus.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(updateStatus.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(updateProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(depositMoney.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(depositMoney.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(depositMoney.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(verifyDeposit.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(verifyDeposit.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(verifyDeposit.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(verifyDepCode.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(verifyDepCode.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(verifyDepCode.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(withdrawMoney.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(withdrawMoney.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(withdrawMoney.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(verifyWithdraw.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(verifyWithdraw.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(verifyWithdraw.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(verifyWdrawCode.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(verifyWdrawCode.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(verifyWdrawCode.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(checkBalance.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkBalance.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(checkBalance.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(transferMoney.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(transferMoney.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(transferMoney.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(verifyTransfer.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(verifyTransfer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(verifyTransfer.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(verifyTransCode.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(verifyTransCode.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(verifyTransCode.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            });
    },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
