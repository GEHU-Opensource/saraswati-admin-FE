import { useState } from "react";
import { Search } from "lucide-react"; // Importing Search Icon from Lucide
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const [DropdownOpen, Dropdownclose] = useState(false);
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [tests] = useState(["TEST 1", "TEST 2", "TEST 3", "TEST 4"]);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [visibleCount, setVisibleCount] = useState(8);

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
                <h2 className="text-2xl text-center font-bold mb-6">ADMIN</h2>

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
            <div className="w-3/4 bg-gray-200 min-h-screen">
                {/* Header */}
                <div className="flex justify-between items-center bg-white p-8 shadow w-full">
                    <h2 className="text-2xl font-bold">ADMIN PAGE</h2>
                    <button onClick={() => Dropdownclose(!DropdownOpen)} className="block">
                        <img src="/profile image.png" alt="Profile" className="w-10 h-10 rounded-full" />
                    </button>
                    {DropdownOpen && (
                        <div className="absolute right-4 mt-110 w-90 h-90 bg-white shadow-lg rounded-lg z-10">
                            <ul className="py-2">
                                <div className="mb-2 flex items-center justify-center">
                                    <img src="/profile image.png" alt="profile" className="w-35 h-35" />
                                </div>
                                <li className="px-4 py-2 cursor-pointer">Name: Admin</li>
                                <li className="px-4 py-2 cursor-pointer">Email: admin@example.com</li>
                                <button className="mt-auto ml-4 text-gray-300 bg-red-600 font-semibold hover:bg-red-800 rounded-sm py-2 px-6" onClick={handleLogout}>Logout</button>
                            </ul>
                        </div>
                    )}
                </div>

                {/* Previous Tests */}
                <div className=" mt-6 p-6">
                    <div className="flex justify-between">
                        <h2 className="text-2xl font-bold mb-4 inline-block">Previous Tests</h2>

                        {/* Search Bar */}
                        <div className="relative mb-4 inline-block w-1/4">
                            <input
                                type="text"
                                placeholder="Search Tests..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                        </div>
                    </div>

                    {/* Tests List */}
                    <div className="flex flex-col gap-4">
                        {filteredTests.map((test, index) => (
                            <div key={index} className="bg-[#f9f9f8] p-4 rounded-lg shadow text-[#3d53a0] font-semibold">
                                {test}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-end items-center w-full">
                {visibleCount < filteredTests.length && (
                    <button className="mt-3 bg-blue-500 text-white p-3 rounded-full m-2" onClick={() => setVisibleCount(visibleCount + 5)}>Show More</button>
                )}
                {visibleCount > 8 && (
                    <button className="mt-3 bg-red-500 text-white p-3 rounded-full m-2" onClick={() => setVisibleCount(8)}>Show Less</button>
                )}
            </div>
            </div>
            
        </div>
    );
};

export default AdminDashboard;
