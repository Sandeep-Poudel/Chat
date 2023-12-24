import Input from "../Reusable/Input";
import { useState } from "react";
import { useDispatch} from "react-redux";
import { changeEmail, changePassword } from '../../store'
import { GoLock, GoMail } from 'react-icons/go'
import Button from "../Reusable/Button";
import Panel from "../Reusable/Panel";
import Line from "../Reusable/Line";


function LoginForm({ toggleView , password, email}) {
    const dispatch = useDispatch();
    const [isTouch, setIsTouch] = useState(false);
    

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
                        <div className="mt-2 flex flex-col items-center justify-center self-center flex-1 w-full">
                            <Button type="submit" primary rounded className="w-36 items-center justify-center ">
                                Login
                            </Button>

                            <div className="flex flex-row w-full items-center my-1">
                                <Line />Or<Line />
                            </div>

                            <Button rounded className="justify-center">
                                <GoMail className="mr-3" />
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