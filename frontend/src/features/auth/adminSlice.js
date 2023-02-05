import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import adminService from "./adminService";

// Get admin from localStorage
const admin = JSON.parse(localStorage.getItem("admin"));

const initialState = {
    admin: admin ? admin : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// Register admin
export const registerAdmin = createAsyncThunk(
    "admin/register",
    async (admin, thunkAPI) => {
        try {
            return await adminService.registerAdmin(admin);
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

// Verify super admin
export const verifySuperAdmin = createAsyncThunk(
    "admin/super-admin-verify",
    async (admin, thunkAPI) => {
        try {
            return await adminService.verifySuperAdmin(admin);
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

export const adminSlice = createSlice({
    name: "admin",
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
            .addCase(registerAdmin.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerAdmin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.admin = action.payload;
            })
            .addCase(registerAdmin.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.admin = null;
            })
            .addCase(verifySuperAdmin.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(verifySuperAdmin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.admin = action.payload;
            })
            .addCase(verifySuperAdmin.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.admin = null;
            });
    },
});

export const { reset } = adminSlice.actions;

export default adminSlice.reducer;
