import Button from "../Reusable/Button";
import Avatar from "./Avatar";


function SidebarHead({ user, logOut }) {
    const handleClick = () => {
        logOut();
    }

    return (
        <div className="flex justify-between items-center bg-gray-800 w-full p-2 rounded-l-md h-[5rem]">
            <div className="flex gap-2 items-center">
                {user.photoURL !== null ? <img src={user.photoURL} alt="user" className="w-10 h-10 rounded-full" /> : <Avatar name={user.displayName} />}
                <div className="font-bold">{user.displayName}</div>
            </div>
            <Button danger rounded onClick={handleClick}>
                Log Out
            </Button>
        </div>
    )
}


export default SidebarHead;