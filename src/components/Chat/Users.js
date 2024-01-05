import { useEffect, useState } from "react";
import Skeleton from "../Reusable/Skeleton";

function Users() {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 3000)
    }, [])


    return (
        isLoading ? <div className="flex flex-col self-start flex-1 py-10 px-4 w-full ">
            <Skeleton times={5} dark className="w-full h-10 "/> 
        </div>:
        <div className="flex-grow flex-1 w-full flex justify-center " >
                <div className="flex flex-col items-center justify-center">
                    <div className="text-2xl font-bold">Users</div>
                    <div className="text-gray-400">No users</div>
                </div>
        </div>
    )
}
export default Users;