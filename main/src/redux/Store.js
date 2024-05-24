import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./UserSlice";

export const Store = configureStore({
    reducer: {
        authentication: userReducer
    }
})