import { GoSearch } from "react-icons/go";
import { useState } from "react";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from "../../firebase";
import User from "../Reusable/User";

function SearchBar() {
    const [username, setUsername] = useState("");
    const [users, setUsers] = useState(null);
    const [error, setError] = useState(null);

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
        return (<User user={user}/>)
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
                <GoSearch className="mr-2 text-gray-400" onClick={handleSearch}/>
            </form>
            {error && <div className="text-red-500">{error}</div>}
            {renderedUsers}

        </div>
    );
}

export default SearchBar;