import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useState } from "react";
import { useSelector } from "react-redux";

function Authenticate() {
    const [isLoginView, setIsLoginView] = useState(true);
    const toggleView = () => {
        setIsLoginView(!isLoginView); // Toggle the view state
    };
    const { username, password, email } = useSelector((state) => {
        return {
            username: state.form.username,
            password: state.form.password,
            email: state.form.email
        }
    });
    return (
        <div className="flex items-center justify-center h-screen flex-col bg-gray-100" >
            <div className="w-[480px]">
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