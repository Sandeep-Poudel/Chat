import { GoSearch } from "react-icons/go";

function SearchBar() {
    return (
        <div className="flex text-gray-400 items-center bg-gray-700  shadow-md w-full  ">
            <input
                type="text"
                placeholder="Search..."
                className="py-2 px-4  focus:outline-none  flex-grow  bg-gray-700"
            />
            <GoSearch className="mr-2 text-gray-400" />
        </div>
    );
}

export default SearchBar;