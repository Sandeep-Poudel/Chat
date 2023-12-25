import Button from "./Reusable/Button";
import {  useSelector } from "react-redux";
import useAuth from "../hooks/useAuth";
function HomePage() {
    const { logOutFromApp } = useAuth();
    const user = useSelector((state) => state.user.user);
    const handleLogOut = () => {
        logOutFromApp();
        console.log(user);
    }

    return (
        <div>
            <h1>Home Page</h1>
            <h2>Welcome {user.displayName}</h2>
            <Button onClick={handleLogOut}>Log out</Button>
        </div>
    )
}
export default HomePage;