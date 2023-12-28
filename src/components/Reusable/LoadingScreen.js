import { GoSync } from "react-icons/go";

const LoadingScreen = ({ isLoading }) => (
    <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${isLoading ? 'block' : 'hidden'}`}>
        <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="flex items-center justify-center mb-4">
                <GoSync className="animate-spin text-4xl text-gray-800" />
            </div>
            <p className="text-center text-gray-800">Loading...</p>
        </div>
    </div>
);

export default LoadingScreen;