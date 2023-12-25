import Input from "../Reusable/Input";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeEmail, changePassword, changeUsername } from '../../store'
import useAuth from '../../hooks/useAuth'
import { GoLock, GoMail, GoPerson } from 'react-icons/go'
import Button from "../Reusable/Button";
import Line from "../Reusable/Line";
import Panel from "../Reusable/Panel";
import icon from '../../assets/icons8-google.svg'

function SignupForm({ toggleView, username, password, email }) {
    const dispatch = useDispatch();
    const [isTouch, setIsTouch] = useState(false);
    const [errors, setErrors] = useState({}); // State for validation errors

    const { createAccountWithEmail, signInWithGoogle } = useAuth();


    const passwordError = isTouch && password.length < 8 ? "Password must be at least 8 characters" : null;

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validateFormData({ username, email, password });
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {

            console.log(email)
            createAccountWithEmail(username, email, password);
        }
    };


    
    const validateFormData = (data) => {
        const errors = {};
        if (!data.username || data.username.length < 4) {
            errors.username = "Username must be at least 4 characters";
        }
        if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            errors.email = "Invalid email format";
        }
        if (!data.password || data.password.length < 8) {
            errors.password = "Password must be at least 8 characters";
        }
        return errors;
    };



    const handleUsernameChange = (e) => {
        dispatch(changeUsername(e.target.value))
    }
    const handlePasswordChange = (e) => {
        dispatch(changePassword(e.target.value))
    }
    const handleEmailChange = (e) => {
        dispatch(changeEmail(e.target.value))
    }

    return (
        <div>
            <Panel>
                <div className="flex flex-col text-gray-700 w-full justify-center items-center">
                    <h1 className="text-3xl font-medium">Sign Up</h1>
                    <form className="flex flex-col mt-4 w-full">
                        <div className="mb-2">
                            <Input
                                label="Username"
                                type="text"
                                required
                                error={errors.username}
                                placeholder="Enter your username"
                                value={username}
                                onChange={handleUsernameChange}
                                icon={<GoPerson />}
                            />
                        </div>
                        <div className="mb-2">
                            <Input
                                label="Email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                icon={<GoMail />}
                                error={errors.email}
                                required
                                onChange={handleEmailChange}
                            />
                        </div>
                        <div className="mb-2">
                            <Input
                                label="Password"
                                type="password"
                                placeholder="Enter your password"
                                icon={<GoLock />}
                                error={passwordError}
                                onBlur={() => setIsTouch(true)}
                                value={password}
                                required
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <div className="mt-3 flex flex-col items-center justify-center self-center flex-1 w-full">
                            <Button type="submit" onClick={handleSubmit} primary rounded className="w-36 items-center justify-center ">
                                Sign Up
                            </Button>

                            <div className="flex flex-row w-full items-center my-3">
                                <Line />Or<Line />
                            </div>

                            <Button rounded secondary className="justify-center" onClick={signInWithGoogle}>
                                <img src={icon} className="w-5 mx-3" alt="Sign up with google" />

                                Sign Up with Google
                            </Button>
                        </div>
                    </form>
                </div>
            </Panel>

            <Panel>
                <div>Already have an account? <span className="text-blue-500 font-bold cursor-pointer" onClick={toggleView}>Login</span></div>
            </Panel>
        </div>
    )
}
export default SignupForm;