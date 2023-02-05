import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";

import adminReducer from "../features/auth/adminSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        admin: adminReducer,
    },
});
