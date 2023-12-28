import Sidebar from '../components/Chat/Sidebar';
import Chat from '../components/Chat/Chat';

import { useSelector } from "react-redux";
import useAuth from "../hooks/useAuth";
function HomePage() {
    const { logOutFromApp } = useAuth();
    const user = useSelector((state) => state.user.user);
    const handleLogOut = () => {
        logOutFromApp();
        console.log(user);
    }

    return (
        <div className="flex h-screen justify-center items-center bg-gray-400 ">
            <div className="w-[90%] h-[80%] bg-gray-500 flex items-center rounded-md">
                <Sidebar user={user} logOut={handleLogOut} />
                <Chat />
            </div>
        </div>
    )
}
export default HomePage;