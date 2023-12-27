import Input from "../Reusable/Input";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeEmail, changePassword } from '../../store'
import { GoLock, GoMail } from 'react-icons/go'
import useAuth from '../../hooks/useAuth'
import Error from "../Reusable/Error";
import { useSelector } from "react-redux";
import Button from "../Reusable/Button";
import Panel from "../Reusable/Panel";
import Line from "../Reusable/Line";
import icon from '../../assets/icons8-google.svg'

function LoginForm({ toggleView }) {
    const dispatch = useDispatch();
    const [isTouch, setIsTouch] = useState(false);
    const [errors, setErrors] = useState({}); // State for validation errors

    const { loginWithEmail, signInWithGoogle } = useAuth();

    const { error, password, email } = useSelector((state) => {
        return {
            error: state.user.error,
            password: state.form.password,
            email: state.form.email
        }
    });

    const validateFormData = (data) => {
        const errors = {};
        if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            errors.email = "Invalid email format";
        }
        if (!data.password || data.password.length < 8) {
            errors.password = "Password must be at least 8 characters";
        }
        return errors;
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validateFormData({email, password });
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {

            console.log(email)
            loginWithEmail(email, password);
        }
    }



    const passwordError = isTouch && password.length < 8 ? "Password must be at least 8 characters" : null;

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
                    <h1 className="text-3xl font-medium">Log in</h1>
                    <form className="flex flex-col mt-4 w-full">
                        <div className="mb-2">
                            <Input
                                label="Email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                icon={<GoMail />}
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
                        <Error error={error} />
                        <div className="mt-2 flex flex-col items-center justify-center self-center flex-1 w-full">
                            <Button type="submit" onClick={handleSubmit} primary rounded className="w-36 items-center justify-center ">
                                Login
                            </Button>

                            <div className="flex flex-row w-full items-center my-1">
                                <Line />Or<Line />
                            </div>

                            <Button secondary rounded onClick={signInWithGoogle} className="justify-center">
                                <img src={icon} className="w-5 mx-3" alt="login with google" />
                                Login with Google
                            </Button>
                        </div>
                    </form>
                </div>
            </Panel>
            <Panel>
                <div>Don't have an account? <span className="text-blue-500 font-bold cursor-pointer" onClick={toggleView}>Sign up</span></div>
            </Panel>
        </div>
    )
}
export default LoginForm;