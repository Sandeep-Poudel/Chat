import { useEffect, useState } from "react";
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from "../../firebase";
import Skeleton from "../Reusable/Skeleton";
import User from "../Reusable/User";

function Users({ currentUser }) {
    const [isLoading, setIsLoading] = useState(false);
    const [chats, setChats] = useState([]);

    useEffect(() => {
        setIsLoading(true)
        const fetchChats = async () => {
            const unsub = await onSnapshot(doc(db, 'usersChat', currentUser.uid), (doc) => {
                console.log("Current data:", doc.data());
                setChats(doc.data())
            })
            return () => {
                unsub();
            }
        }
        currentUser.uid && fetchChats()
        setIsLoading(false)
    }, [currentUser.uid])
    console.log(Object.entries(chats))

    const renderedUsers = Object.entries(chats).map(chat => {
        const user = {
            uid: chat[1].userInfo.uid,
            displayName: chat[1].userInfo.displayName,
            photoURL: chat[1].userInfo.photoURL

        }
        return <User key={chat[0]} user={user} />
    })
    console.log(renderedUsers)

    return (
        isLoading ? <div className="flex flex-col self-start flex-1 py-10 px-4 w-full ">
            <Skeleton times={8} dark className="w-full h-10 " />
        </div> :

            chats ? (
                <div className="flex flex-col w-full flex-1 justify-start items-start mb-2">
                    {renderedUsers}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center">
                    <div className="text-2xl font-bold">Users</div>
                    <div className="text-gray-400">No users</div>
                </div>
            )

    )
}
export default Users;