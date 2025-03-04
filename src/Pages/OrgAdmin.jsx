import { useState } from "react";
import { Search } from "lucide-react"; // Importing Search Icon from Lucide
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [tests] = useState(["TEST 1", "TEST 2", "TEST 3", "TEST 4"]);
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/')
    };

    const filteredTests = tests.filter((test) =>
        test.toLowerCase().includes(search.toLowerCase())
    );

    if (!isLoggedIn) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
                <h1 className="text-3xl font-bold text-red-500">You are Logged Out</h1>
                <p className="text-gray-600 mt-2">Thank you for using the platform.</p>
                <button
                    onClick={() => setIsLoggedIn(true)}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    Log in Again
                </button>
            </div>
        );
    }

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-1/4 bg-[#3d53a0] text-white p-6 flex flex-col justify-between">
                <h2 className="text-xl text-center font-bold mb-6">ADMIN</h2>

                {/* Admin Actions moved to Sidebar */}
                <div className="flex flex-col gap-8 w-full items-center">
                    <button className="shadow-md shadow-black bg-white hover:bg-gray-300 text-black py-3 px-6 rounded-xl w-3/5 ">
                    <Link to='/ManageAdmin'>Manage Admins</Link>
                    </button>
                    <button className="shadow-md shadow-black bg-white hover:bg-gray-300 text-black py-3 px-6 rounded-xl w-3/5 ">
                        <Link to='/UpcomingTests'>Scheduled Tests</Link>
                    </button>
                    <button className="shadow-md shadow-black bg-white hover:bg-gray-300 text-black py-3 px-6 rounded-xl w-3/5 ">
                    <Link to='/Students'>Manage Students</Link>
                    </button>
                </div>

                {/* Logout Button */}
                <div className="mt-auto flex justify-center">
                    <button
                        onClick={handleLogout}
                        className="mt-auto mb-5 text-gray-300 bg-red-600 font-semibold hover:bg-red-800 rounded-sm py-2 px-6 w-[72"
                    >
                        Log out
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="w-4/5 bg-gray-200 p-8">
                {/* Header */}
                <div className="bg-white shadow-md rounded-lg p-6 mb-6 text-center">
                    <h1 className="text-2xl font-bold">Organization Name</h1>
                </div>

                {/* Previous Tests */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Previous Tests</h2>

                    {/* Search Bar */}
                    <div className="relative mb-4">
                        <input
                            type="text"
                            placeholder="Search Tests..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full p-2 pl-10 border rounded-md"
                        />
                        <Search className="absolute left-3 top-3 text-gray-500" size={18} />
                    </div>

                    {/* Tests List */}
                    <div className="flex flex-col gap-4">
                        {filteredTests.map((test, index) => (
                            <div key={index} className="bg-gray-200 p-4 rounded-lg">
                                {test}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
