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
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }

});

export const {logIn,logOut,setError,setLoading} = userSlice.actions;
export const userReducer = userSlice.reducer;