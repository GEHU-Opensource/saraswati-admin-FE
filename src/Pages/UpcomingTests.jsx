import { useState } from "react";
import { Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Button = ({ label, onClick, variant = "primary" }) => {
    return (
        <button
            onClick={(event) => {
                event.stopPropagation();
                if (onClick) onClick();
            }}
            className={`px-4 py-2 rounded-full text-white ${variant === "primary" ? "bg-blue-500" : "bg-red-600"
                }`}
        >
            {label}
        </button>
    );
};

const TestCard = ({ id, title, date, onDelete }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow flex justify-between items-center">
            <div>
                <h3 className="text-xl font-bold text-gray-700 ">{title}</h3>
                <p className="font-semibold text-blue-600 ">{date}</p>
            </div>
            <div className="space-x-2">
                <Link to={"/createTest"}><Button label="Update" /></Link>
                <Button label="Delete" onClick={() => onDelete(id)} variant="danger" />
            </div>
        </div>
    );
};

const SearchBar = ({ value, onChange }) => {
    return (
        <div className="relative w-74 max-w-sm">
            <input
                type="text"
                placeholder="Search"
                className="w-full rounded-full p-3 pr-10 text-black bg-white border border-gray-300 focus:outline-blue-600"
                value={value}
                onChange={onChange}
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
    );
};

const UpcomingTests = () => {
    const navigate = useNavigate();
    const [DropdownOpen, Dropdownclose] = useState(false);
    const [search, setSearch] = useState("");
    const [tests, setTests] = useState([
        { id: 1, title: "TEST 1", date: "Time and Date" },
        { id: 2, title: "TEST 2", date: "Time and Date" },
        { id: 3, title: "TEST 3", date: "Time and Date" },
        { id: 4, title: "TEST 4", date: "Time and Date" },
    ]);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this test?")) {
            setTests((prevTests) => prevTests.filter((test) => test.id !== id));
            toast.error(`Test ${id} deleted successfully.`);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/')
    };

    const filteredTests = tests.filter((test) =>
        test.title.toUpperCase().includes(search.toUpperCase())
    );

    return (
        <div className="min-h-screen flex justify-center">
            <ToastContainer />
            <div className="bg-white w-screen rounded-lg shadow-lg">
                <div className="flex justify-between">
                    <div className="flex justify-between items-center bg-white p-8 shadow w-full">
                        <h2 className="text-3xl font-bold">UPCOMING TESTS</h2>
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
                </div>
                <div className="bg-gray-200 p-12 h-screen">
                    <div className="mb-8 grid justify-items-end">
                        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <div className="space-y-4">
                        {filteredTests.map((test) => (
                            <TestCard key={test.id} {...test} onDelete={handleDelete} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpcomingTests;