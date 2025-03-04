import React, { useState } from 'react'
export default function UpdateAdmin() {
    const [adminname, setadminname] = useState("");
    const [adminid, setadminid] = useState("");
    const [passward, setpassward] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!adminname || !adminid || !passward) {
            alert("Please fill all the fields before submitting. ");
            return;
        }
        alert("Admin updated sucessfully!")
    }
    return (
        <>
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="bg-[#1A1A3D] text-white p-6 rounded-2xl shadow-lg w-100">
                    <h1 className="font-bold text-2xl text-center mb-4">CREATE ADMIN</h1>
                    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
                        <input type="text" placeholder="Admin Name" onChange={(e) => setadminname(e.target.value)} className="p-2 bg-white text-black text-center w-70 rounded-xl mb-6" />
                        <input type="number" placeholder="Admin ID" onChange={(e) => setadminid(e.target.value)} className="p-2 bg-white text-black text-center w-70 rounded-xl mb-6" />
                        <input type="email" placeholder="Email" onChange={(e) => setpassward(e.target.value)} className="p-2 bg-white text-black text-center rounded-xl w-70 mb-6" />
                        <input type="number" placeholder="Phone Number" onChange={(e) => setpassward(e.target.value)} className="p-2 bg-white text-black text-center rounded-xl w-70 mb-6" />
                        <input type="text" placeholder="Password" onChange={(e) => setpassward(e.target.value)} className="p-2 bg-white text-black text-center rounded-xl w-70 mb-6" />
                        <button className="bg-gray-500 rounded-xl w-30 h-10 hover:bg-gray-600">Create Admin </button>
                    </form>

                </div>
            </div>
        </>
    )
}
//On creating an admin it will firstly be updated in backedn than fetched to frontend.
