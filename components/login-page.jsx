import { useState } from "react";

export default function Login() {
    // State for Admin ID and Password
    const [adminId, setAdminId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    // Handle form submission
    const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    if (!adminId || !password) {
        setError("Please fill in all fields.");
        return;
    }

    // Simulated authentication logic
    if(adminId === "admin" && password === "password123") {
        alert("Login successful!");
        setError(""); // Clear errors if login is correct
    }
    else {
        setError("Invalid credentials. Try again.");
    }
};

return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-[#1a1a40] p-8 rounded-lg shadow-lg w-96 text-center">
        {/* Admin Login Heading */}
        <div className="text-white text-2xl font-bold py-2 px-6 rounded mb-6">
          Admin Login
        </div>

        {/* Display Error Message */}
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        {/* Login Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Admin ID Input */}
          <div>
            <input type="text" placeholder="Admin Id" className="w-full px-4 py-2 border rounded bg-white text-black focus:outline-none" value={adminId} onChange={(e) => setAdminId(e.target.value)}/>
          </div>

          {/* Password Input */}
          <div>
            <input type="password" placeholder="Password" className="w-full px-4 py-2 border rounded bg-white text-black focus:outline-none" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>

          {/* Login Button */}
          <div>
            <button type="submit" className="bg-gray-500 text-white font-bold py-2 px-6 rounded w-full hover:bg-gray-600 transition duration-200">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}