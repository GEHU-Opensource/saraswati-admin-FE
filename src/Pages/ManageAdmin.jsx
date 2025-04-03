import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ManageAdmin() {
    const navigate = useNavigate();
    const [DropdownOpen, Dropdownclose] = useState(false);
    const [admins, setAdmins] = useState(["Admin 1", "Admin 2", "Admin 3", "Admin 4", "Admin 5"]);

    const handleDelete = (index) => {
        if (window.confirm("Are you sure you want to delete this admin?")) {
            setAdmins(admins.filter((_, i) => i !== index));
            toast.error(`Admin ${index + 1} deleted successfully.`);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/')
    };

    return (
        <div className="flex h-screen">
            <ToastContainer />
            {/* Sidebar */}
            <div className="w-1/4 bg-[#3d53a0] p-4 flex flex-col items-center">
                <h1 className="text-2xl font-bold mb-10 text-white">ADMIN</h1>
                <Link to="/addadmin" className="text-center shadow-md shadow-black bg-white hover:bg-gray-300 text-black py-3 px-6 rounded-xl w-3/5">Add Admin</Link>
            </div>

            {/* Main Content */}
            <div className="w-3/4 bg-gray-200">
                <div className="flex justify-between items-center bg-white p-6 shadow">
                    <h2 className="text-2xl font-bold">MANAGE ADMINS</h2>
                    <button onClick={() => Dropdownclose(!DropdownOpen)} className="block">
                        <img src="/profile image.png" alt="Profile" className="w-10 h-10 rounded-full" />
                    </button>
                    {DropdownOpen && (
                        <div className="absolute right-0 mt-130 w-90 h-120 bg-white shadow-lg rounded-lg z-10">
                            <ul className="py-2">
                                <div className="mb-2 flex items-center justify-center">
                                    <img src="/profile image.png" alt="profile" className="w-35 h-35" />
                                </div>
                                <li className="flex justify-center font-bold px-4 py-2 cursor-pointer">Organization name</li>
                                <li className="px-4 py-2 cursor-pointer">Name: Admin</li>
                                <li className="px-4 py-2 cursor-pointer">Email: admin@example.com</li>
                                <li className="px-4 py-2 cursor-pointer border-t" onClick={handleLogout}>
                                    Logout
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
                <div className="space-y-4 mt-6 p-6">
                    {admins.map((admin, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg flex justify-between items-center shadow">
                            <span className="text-gray-700 text-semibold text-lg ">{admin}</span>
                            <div className="space-x-2">
                                <Link to="/updateadmin" className="bg-blue-600 hover:bg-sky-700 text-white px-5 py-3 rounded-full">Update</Link>
                                <button
                                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-full"
                                    onClick={() => handleDelete(index)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}