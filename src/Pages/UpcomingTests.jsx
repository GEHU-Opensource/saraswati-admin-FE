import { useState } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const Button = ({ label, onClick, variant = "primary" }) => {
    return (
        <button
            onClick={(event) => {
                event.stopPropagation();
                if (onClick) onClick();
            }}
            className={`px-4 py-1 rounded-full text-white ${variant === "primary" ? "bg-blue-500" : "bg-red-600"
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
        <div className="relative w-56 max-w-sm">
            <input
                type="text"
                placeholder="Search"
                className="w-full rounded-md p-2 pr-10 text-black bg-white border border-gray-300 focus:outline-none"
                value={value}
                onChange={onChange}
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
    );
};

const UpcomingTests = () => {
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
        }
    };


    const filteredTests = tests.filter((test) =>
        test.title.toUpperCase().includes(search.toUpperCase())
    );

    return (
        <div className="min-h-screen flex justify-center">
            <div className="bg-white w-screen rounded-lg shadow-lg">
                <div className="flex justify-between p-6 mb-4">
                    <button className="px-4 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded"><Link to='/orgadmin'>Back</Link></button>
                    <h2 className="text-4xl font-bold text-center">Upcoming Tests</h2>
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
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
