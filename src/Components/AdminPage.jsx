import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Search } from 'lucide-react';

const AdminPage = () => {

    const navigate = useNavigate();
    const [DropdownOpen, Dropdownclose] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [visibleCount, setVisibleCount] = useState(8);
    const [tests, setTests] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/tests")
            .then(response => setTests(response.data))
            .catch(error => console.error("Error fetching tests:", error));
    }, []);

    

    const filteredTests = tests.filter((test) =>
        test.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex min-h-screen bg-gray-300">
            {/* Sidebar */}
            <div className="w-1/4 bg-[#1A1A3D] text-white flex flex-col items-center p-5 h-screen fixed left-0 top-0">
                <h1 className="text-2xl font-bold mb-10">ADMIN</h1>

                <div className="flex flex-col items-center space-y-10 w-full">
                    <button
                        className="bg-white text-black py-3 px-6 rounded-2xl w-4/5 flex items-center justify-center shadow"
                    >
                        <Link to="/CreateTest">Create Test</Link>
                    </button>
                    <button
                        className="bg-white text-black py-3 px-6 rounded-2xl w-4/5 flex items-center justify-center shadow"
                        onClick={() => alert("Upcoming Tests Page Coming Soon!")}
                    >
                        Upcoming Tests
                    </button>
                    <button
                        className="bg-white text-black py-3 px-6 rounded-2xl w-4/5 flex items-center justify-center shadow"
                    >
                        <Link to="/Leaderboard">Leaderboard</Link>
                    </button>

                </div>

                <div className="mt-auto mb-5">
                    <button className="text-gray-300"><Link to="/Login">Logout</Link></button>
                </div>
            </div>


            {/* Main Content */}
            <div className="ml-1/4 flex-grow pl-[25%]">
                <div className="flex justify-between items-center bg-white p-6 shadow">
                    <h2 className="text-2xl font-bold">ADMIN PAGE</h2>
                    <button onClick={() => Dropdownclose(!DropdownOpen)} className="block">
                        <img src="/profile image.png" alt="Profile" className="w-10 h-10 rounded-full" />
                    </button>
                    {DropdownOpen && (
                        <div className="absolute right-0 mt-130 w-90 h-120 bg-white shadow-lg rounded-lg z-10">
                            <ul className="py-2">
                                <div className="mb-2 flex items-center justify-center">
                                    <img src="/profile image.png" alt="profile" className=" w-35 h-35" />
                                </div>
                                <li className="flex justify-center font-bold px-4 py-2 cursor-pointer">Orgination name</li>
                                <li className="px-4 py-2 cursor-pointer">Name: Admin</li>
                                <li className="px-4 py-2 cursor-pointer">Email: admin@example.com</li>
                                <li className="px-4 py-2 cursor-pointer border-t" onClick={() => alert("Logging out...")}>
                                    Logout
                                </li>
                            </ul>
                        </div>
                    )
                    }
                </div>

                <div className="mt-6 p-6">
                    <div className="flex flex-row md:flex-row justify-between items-center mb-4 gap-4">
                        <h3 className="text-lg font-bold">Previous Tests</h3>
                        <div className="relative w-full max-w-xs">
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                        </div>

                    </div>

                    <div className="space-y-3">
                        {filteredTests.length > 0 ? (
                            filteredTests.slice(0, visibleCount).map((test) => (
                                <button
                                    key={test.id}
                                    className="bg-white text-black p-4 rounded-md font-bold w-full text-left shadow"
                                    onClick={() => alert(`Opening ${test.title}...`)}
                                >
                                    {test.title}
                                </button>
                            ))
                        ) : (
                            <p className="text-gray-600">No matching tests found.</p>
                        )}
                    </div>

                    {visibleCount < filteredTests.length && (
                        <button
                            className="mt-3 text-left text-blue-500 py-2 px-4 rounded w-full"
                            onClick={() => setVisibleCount(visibleCount + 5)}
                        >
                            Read More
                        </button>
                    )}

                    {visibleCount > 8 && (
                        <button
                            className="mt-3 text-left text-blue-500 py-2 px-4 rounded w-full"
                            onClick={() => setVisibleCount(8)}
                        >
                            Show Less
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
