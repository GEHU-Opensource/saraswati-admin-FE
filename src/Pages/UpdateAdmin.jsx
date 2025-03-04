import React, { useState } from 'react';

export default function UpdateAdmin() {
  const [adminname, setAdminName] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [updatedAdminName, setUpdatedAdminName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!adminname || !password) {
      alert("Please fill all the fields before submitting.");
      return;
    }
    setSuccessMessage("Admin updated successfully!");
    setUpdatedAdminName(adminname);
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-[#1A1A3D] text-white p-6 rounded-2xl shadow-lg w-96">
          <h1 className="font-bold text-2xl text-center mb-4">UPDATE ADMIN</h1>
          <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
            <input
              type="text"
              placeholder="Admin Name"
              value={adminname}
              onChange={(e) => setAdminName(e.target.value)}
              className="p-2 bg-white text-black text-center w-80 rounded-xl mb-6 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 bg-white text-black text-center w-80 rounded-xl mb-6 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-gray-500 rounded-xl w-40 h-10 hover:bg-gray-600 text-white"
            >
              Update Admin
            </button>
          </form>
          {successMessage && (
            <div className="mt-4 text-center text-green-500 font-semibold">
              {successMessage}
            </div>
          )}
          {updatedAdminName && (
            <div className="mt-4 text-center text-white font-semibold">
              Updated Admin Name: {updatedAdminName}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

//On updating admin name it wil first request backend and then it will be updated.