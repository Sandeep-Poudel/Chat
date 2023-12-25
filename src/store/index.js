import { changeEmail, changePassword, changeUsername, formReducer } from './slices/formSlice'
import { logIn, logOut, setError, setLoading, userReducer } from './slices/userSlice'
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
    setError,
    setLoading,
    logOut,
    logIn
}