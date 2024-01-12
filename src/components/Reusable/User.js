import Avatar from "../Chat/Avatar";



function User({ user, onClick }) {
    return (
        <div className="flex justify-between items-center bg-gray-800 w-full p-2 rounded-l-md cursor-pointer" onClick={onClick}>
            <div className="flex gap-2 items-center">
                {user.photoURL !== null ? <img src={user.photoURL} alt="user" className="w-10 h-10 rounded-full" /> : <Avatar name={user.displayName} />}
                <div className="font-bold">{user.displayName}</div>
            </div>
        </div>
    )
}
export default User;