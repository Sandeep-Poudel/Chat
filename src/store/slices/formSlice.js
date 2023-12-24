import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
    name: "form",
    initialState: {
        username: "",
        password: '',
        email: ""
    },
    reducers: {
        changeUsername: (state, action) => {
            state.username = action.payload;
        },
        changePassword: (state, action) => {
            state.password = action.payload;
        },
        changeEmail: (state, action) => {
            state.email = action.payload;
        },

    }
});
export const { changeEmail, changePassword, changeUsername } = formSlice.actions;
export const formReducer = formSlice.reducer;