import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LoadingScreen from "../Reusable/LoadingScreen";
function Authenticate() {
    const [isLoginView, setIsLoginView] = useState(true);
    
    const toggleView = () => {
        setIsLoginView(!isLoginView); // Toggle the view state
    };

    const { isLoading, isLoggedin, username, password, email } = useSelector((state) => {
        return {
            isLoding: state.user.isLoding,
            isLoggedin: state.user.isLoggedin,
            username: state.form.username,
            password: state.form.password,
            email: state.form.email
        }
    });
    if (isLoggedin) {
        return <Navigate to="/home" replace />
    };
    return (
        <div className="flex items-center justify-center h-screen flex-col bg-gray-100" >
            <div className="w-[480px]">
                <LoadingScreen isLoading={isLoading} />
                {isLoginView ? (
                    <LoginForm password={password} email={email} toggleView={toggleView} />
                ) : (
                    <SignupForm toggleView={toggleView} username={username} password={password} email={email} />
                )}
            </div>
        </div>
    )
}
export default Authenticate;