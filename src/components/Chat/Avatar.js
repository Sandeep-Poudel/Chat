const Avatar = ({ name }) => {

    const initials = name ? name.charAt(0) : "#";

    return (
        <div className="flex items-center justify-center w-10 h-10 bg-blue-500 font-sm rounded-full">
            <span className="text-white text-2xl">{initials}</span>
        </div>
    );
};

export default Avatar;