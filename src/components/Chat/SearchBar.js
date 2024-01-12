import { GoSearch } from "react-icons/go";
import { useState } from "react";
import { collection, query, where, getDocs, getDoc, setDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from "../../firebase";
import User from "../Reusable/User";

function SearchBar({ currentuser }) {
    const [username, setUsername] = useState("");
    const [users, setUsers] = useState(null);
    const [error, setError] = useState(null);

    const handleAddUser = async (user) => {
        const combinedId = currentuser.uid > user.uid ? currentuser.uid + user.uid : user.uid + currentuser.uid;
        try {
            const res = await getDoc(doc(db, "chats", combinedId));
            console.log('Chat document exists:', res.exists());
            if (!res.exists()) {
                await setDoc(doc(db, "chats", combinedId), { messages: [] })
                console.log('Chat document created successfully.');

                await updateDoc(doc(db, "usersChat", currentuser.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoUrl: user.photoUrl || null
                    },
                    [combinedId + ".date"]: serverTimestamp()
                })
                console.log('User data updated successfully.');
                await updateDoc(doc(db, "usersChat", user.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: currentuser.uid,
                        displayName: currentuser.displayName,
                        photoUrl: currentuser.photoUrl || null
                    },
                    [combinedId + ".date"]: serverTimestamp()
                })
            }
        }
        catch (err) {
            console.log(err)
        }
        setUsers(null)
        setUsername("")
    }

    const handleSearch = async (e) => {
        e.preventDefault();

        try {
            const q = query(collection(db, 'users'), where('email', '==', username));
            const querySnapshot = await getDocs(q);
            const usersData = [];
            querySnapshot.forEach((doc) => {
                usersData.push(doc.data());
            });

            setUsers(usersData);
        } catch (err) {
            setError(err.message);
            console.log(err.message)
        }
    }

    const renderedUsers = users && users.map((user) => {
        return (<User user={user} onClick={()=>handleAddUser(user)} />)
    })

    return (
        <div className="w-full ">
            <form className="flex text-gray-400 items-center bg-gray-700  shadow-md" onSubmit={handleSearch}>
                <input
                    type="text"
                    value={username}
                    placeholder="Search..."
                    onChange={(e) => setUsername(e.target.value)}
                    className="py-2 px-4  focus:outline-none  flex-grow  bg-gray-700"
                />
                <GoSearch className="mr-2 text-gray-400" onClick={handleSearch} />
            </form>
            {error && <div className="text-red-500">{error}</div>}
            {renderedUsers}

        </div>
    );
}

export default SearchBar;