import Authenticate from "./components/Authenticate/Authenticate";
import { useSelector } from "react-redux";
import HomePage from "./components/Homepage";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logIn, logOut } from "./store";
import { auth } from "./firebase";

function App() {
    const isLoggedin = useSelector((state) => state.user.isLoggedin);
    const dispatch = useDispatch();
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                const currentUser = {
                    displayName: user.displayName,
                    email: user.email,
                    uid: user.uid,
                    photoURL: user.photoURL,
                    phoneNumber: user.phoneNumber,
                    providerId: user.providerId,
                    isAnonymous: user.isAnonymous,
                    lastLoggedInAt: user.metadata.lastLoggedInAt,
                    createdAt: user.metadata.createdAt,
                    lastRefreshAt: user.metadata.lastRefreshAt,
                    emailVerified: user.emailVerified,
                }
                
                dispatch(logIn(currentUser));
            }
            else {
                dispatch(logOut());
            }
        })

    })

    return (
        <Routes>
            <Route path="/auth" element={<Authenticate />} />
            <Route
                path="/home"
                element={
                    isLoggedin ? <HomePage /> : <Navigate to="/auth" replace />
                }
            />
            <Route path="/" element={<Navigate to="/home" replace />} />
        </Routes>
    );
}

export default App;