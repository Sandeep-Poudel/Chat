import SidebarHead from "./SidebarHead";
import Users from "./Users";
import SearchBar from './SearchBar';

function Sidebar({ user, logOut }) {
    return (
        <div className="w-1/4 bg-gray-900 text-gray-300 h-full justify-between flex items-center flex-col rounded-md ">
            <SidebarHead user={user} logOut={logOut} />
            <SearchBar currentuser={user}/>
            <Users currentUser={user}/>
        </div>
    )
}
export default Sidebar;