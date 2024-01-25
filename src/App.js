
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logIn, logOut, setLoading } from "./store";
import { auth } from "./firebase";
import LoadingScreen from "./components/Reusable/LoadingScreen";
import Authenticate from "./pages/Authenticate";
import HomePage from "./pages/Homepage";
import { Navigate, Route, Routes } from "react-router-dom";

function App() {
    const [authCompleted, setAuthCompleted] = useState(false);
    const isLoggedin = useSelector((state) => state.user.isLoggedin);
    const isLoading = useSelector((state) => state.user.isLoading);
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
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
                };

                dispatch(logIn(currentUser));
            } else {
                dispatch(logOut());
            }
            setAuthCompleted(true);
        });

        return () => {
            unsubscribe();
        };
    }, [dispatch]);

    useEffect(() => {
        dispatch(setLoading(false));
    }, [dispatch]);

    return (
        authCompleted && (
            isLoading ? <LoadingScreen isLoading={isLoading} /> :
                <Routes>
                    <Route path="/" element={<Authenticate />} />
                    <Route path="/home" element={isLoggedin ? <HomePage /> : <Navigate to="/auth" replace />} />
                    <Route path="/auth" element={<Authenticate />} />
                    <Route path="*" element={<h1 className="min-h-screen w-full justify-center flex items-center">404 Not Found</h1>} />
                </Routes>

        )
    );
}

export default App;