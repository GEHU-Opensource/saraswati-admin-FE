import React, { useEffect, useState } from 'react';
import profileImage from '../assets/profile.png';
import PopUp from './PopUp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Students = () => {
    const notify = () => toast("Data updated successfully.");

    const [data, setData] = useState([]);
    const [filterval, setFilterval] = useState("");
    const [popUpData, setPopUpData] = useState(null)

    const fetchData = async (endpoint) => {
        try {
            const response = await fetch(endpoint);
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData('https://jsonplaceholder.typicode.com/albums');
    }, []);

    const handleDelete = (studentId) => {
        const confirmed = window.confirm("Are you sure you want to delete this student? \n This action is irreversible.");
        if (confirmed) {
            setData(data.filter(student => student.id !== studentId));
            toast(`Student ${studentId} deleted successfully.`);
        }
    };

    const handleUpload=()=>{
        console.log("Uploading to backend.\n After fetching from backend then it will be shown to frontend.")
    }

    const updateStudent = (id, name, section) => {
        setData(data.map(student => student.id === id ? { ...student, title: name, section: section } : student));
    };


    return (
        <main className="py-5 px-20 bg-sky-100 relative">
            <ToastContainer />
            {popUpData && <PopUp user={popUpData} ExitPopUp={() => setPopUpData(null)} notifyFUN={() => notify()} updateStudent={updateStudent} />}
            <div>
                <div className='flex justify-between items-center'>
                    <h2 className='text-4xl font-bold text-gray-800'>Manage Students</h2>
                    <img  width="50" src={profileImage} className='rounded-full relative top-10 right-10' alt="Profile"/>
                </div>
            </div>
            <div className='flex p-5 justify-start'>
                <div className="flex rounded-md border-2 border-blue-500 overflow-hidden max-w-md mx-auto">
                    <input type="text" placeholder="Search Student Id" onChange={(e) => setFilterval(e.target.value)}
                        className="w-full outline-none bg-white text-gray-600 text-sm px-4 py-2" />
                    <button onClick={() => console.log("Button Clicked")} type='button' className="flex items-center justify-center bg-[#007bff] px-5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px" className="fill-white">
                            <path
                                d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
                            </path>
                        </svg>
                    </button>
                </div>
            </div>
            <div className="flex items-end justify-center gap-2 p-2">
                <div className="">
                    <label className="text-base text-gray-500 font-semibold mb-2 block text-center">Add Students List</label>
                    <input type="file"
                        className="w-full text-gray-400 font-semibold text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded" />
                </div>
                <div className='flex items-baseline'>
                    <button onClick={() => handleUpload()}
                    className="px-4 py-1 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200 mx-1">
                    Add Students
                </button>
                </div>
            </div>
            <div className="flex justify-between items-center my-5">
                {['Course', 'Year', 'Branch', 'Section'].map((filter, index) => (
                    <select key={index} id={filter.toLowerCase()} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/5 p-2.5 ">
                        <option defaultValue>{filter}</option>
                        {filter === 'Course' && ['B.Tech', 'M.Tech', 'BCA', 'BBA'].map((option, i) => <option key={i} value={option}>{option}</option>)}
                        {filter === 'Year' && ['I Year', 'II Year', 'III Year', 'IV Year'].map((option, i) => <option key={i} value={option}>{option}</option>)}
                        {filter === 'Branch' && ['CSE', 'Mechanical', 'Civil', 'Electrical'].map((option, i) => <option key={i} value={option}>{option}</option>)}
                        {filter === 'Section' && ['A', 'B', 'C', 'D'].map((option, i) => <option key={i} value={option}>{option}</option>)}
                    </select>
                ))}
            </div>
            <div className="students-list">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="w-full bg-sky-800 text-white">
                            <th className="py-2 px-4  text-start">Name</th>
                            <th className="py-2 px-4">University Roll No.</th>
                            <th className="py-2 px-4">Info</th>
                            <th className="py-2 px-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.filter(item => filterval === "" || item.id.toString().includes(filterval)).map(student => (
                            <tr key={student.id} className="border-b text-sky-600">
                                <td className="py-2 px-4 ">{student.title}</td>
                                <td className="py-2 px-4 text-center">{student.id}</td>
                                <td className="py-2 px-4 text-center">{student.section || "B.Tech CSE III D"}</td>
                                <td className="py-2 px-4 text-center">
                                    <button onClick={() => setPopUpData(student)}
                                        className="px-4 my-2 py-1 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200 mx-1">
                                        Update
                                    </button>

                                    <button onClick={() => handleDelete(student.id)} className="px-4 py-1 rounded-full bg-gradient-to-b from-red-500 to-red-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200 mx-1">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}

export default Students;