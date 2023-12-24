import { changeEmail, changePassword, changeUsername, formReducer } from './slices/formSlice'
import { logIn, logOut, userReducer } from './slices/userSlice'
import { configureStore } from '@reduxjs/toolkit'
const store = configureStore({
    reducer: {
        user: userReducer,
        form: formReducer
    }
});

export {
    store,
    changeEmail,
    changePassword,
    changeUsername,
    logOut,
    logIn
}