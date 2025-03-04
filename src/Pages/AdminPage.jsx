import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();
  const [DropdownOpen, Dropdownclose] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);
  const [tests, setTests] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setTests(data.slice(0, 30))) // Limit to 30 test items
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredTests = tests.filter((test) =>
    test.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/')
  };

  const handleTestClick = (test) => {
    // Navigate to the leaderboard page and pass the test data as state
    navigate('/leaderboard');
  };

  return (
    <div className="flex min-h-screen bg-gray-200">
      {/* Sidebar */}
      <div className="w-1/4 bg-[#3d53a0] text-white flex flex-col items-center p-5 h-screen fixed left-0 top-0">
        <h1 className="text-2xl font-bold mb-10">ADMIN</h1>
        <div className="flex flex-col items-center space-y-6 w-full">
          <button className="shadow-md shadow-black bg-white hover:bg-gray-300 text-black py-3 px-6 rounded-xl w-3/5 ">
            <Link to="/CreateTest">Create Test</Link>
          </button>
          <button className="shadow-md shadow-black bg-white hover:bg-gray-300 text-black py-3 px-6 rounded-xl w-3/5 ">
            <Link to="/upcomingtests">Upcoming Tests</Link>
          </button>
          <button className="shadow-md shadow-black bg-white hover:bg-gray-300 text-black py-3 px-6 rounded-xl w-3/5 " onClick={() => alert("Student Details Page is in Phase II!")}>
            View Student Details
          </button>
        </div>
        <button className="mt-auto mb-5 text-gray-300 bg-red-600 font-semibold hover:bg-red-800 rounded-sm py-2 px-6" onClick={handleLogout}>
          Log out
        </button>
      </div>
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

        {/* Search & Test List */}
        <div className="mt-6 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold">Previous Tests</h3>
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
                  className="bg-[#f9f9f8] p-4 rounded-md text-[#3d53a0] font-semibold w-full text-left shadow"
                  onClick={() => handleTestClick(test)}
                >
                  {test.title}
                </button>
              ))
            ) : (
              <p className="text-gray-600">No matching tests found.</p>
            )}
          </div>

          {visibleCount < filteredTests.length && (
            <button className="mt-3 text-[#3d53a0]  w-full" onClick={() => setVisibleCount(visibleCount + 5)}>Read More</button>
          )}
          {visibleCount > 8 && (
            <button className="mt-3 text-[#3d53a0]  w-full" onClick={() => setVisibleCount(8)}>Show Less</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;