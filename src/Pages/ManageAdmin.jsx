import React, { useState } from "react";
import { Link } from "react-router-dom";
export default function ManageAdmin() {
  const [admins, setAdmins] = useState(["Admin 1", "Admin 2", "Admin 3", "Admin 4", "Admin 5"]);

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      setAdmins(admins.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-sky-800 p-4 flex flex-col items-center">
        <Link to="/Createadmin" className="bg-white mt-16 text-black text-xl hover:bg-gray-200 px-4 py-2 rounded-md">Add Admin</Link>
      </div>
      
      {/* Main Content */}
      <div className="w-3/4 bg-sky-100 p-6">
        <h1 className="text-center text-3xl font-bold mb-6">Manage Admins</h1>
        <div className="space-y-4">
          {admins.map((admin, index) => (
            <div key={index} className="bg-white p-4 rounded-lg flex justify-between items-center">
              <span className="text-gray-700 text-semibold text-lg ">{admin}</span>
              <div className="space-x-2">
                <Link to="/updateadmin" className="bg-sky-600 hover:bg-sky-700 text-white px-3 py-1 rounded-md">Update</Link>
                <button 
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md"
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