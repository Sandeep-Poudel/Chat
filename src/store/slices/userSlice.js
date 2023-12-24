import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        isLoggedin: false,
        isLoading: false,
        error: null
    },
    reducers: {
        logIn: (state, action) => {
            state.user = action.payload;
            state.isLoggedin = true;
        },
        logOut: (state) => {
            state.user = null;
            state.isLoggedin = false;
        }
    }

});

export const {logIn,logOut} = userSlice.actions;
export const userReducer = userSlice.reducer;