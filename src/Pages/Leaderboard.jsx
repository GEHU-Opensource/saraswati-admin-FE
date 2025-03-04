import React, { useEffect, useState } from 'react';
import profileImage from '../assets/profile.png';
import '../App.css';

const Leaderboard = () => {
    const [first, setFirst] = useState(profileImage);
    const [second, setSecond] = useState(profileImage);
    const [third, setThird] = useState(profileImage);
    const [data, setData] = useState([]);
    const [selectedButton, setSelectedButton] = useState('ALL');

    const fetchData = async (endpoint) => {
        try {
            const response = await fetch(endpoint);
            const data = await response.json();
            console.log(data);
            setData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchImageData = async () => {
        try {
            console.log('Fetching images');
            const response = await fetch('https://picsum.photos/v2/list?page=2&limit=10');
            const data = await response.json();
            // Assuming data is an array of image objects
            setFirst(data[0]?.download_url || profileImage);
            setSecond(data[1]?.download_url || profileImage);
            setThird(data[2]?.download_url || profileImage);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    useEffect(() => {
        // Fetch initial data and images when the component mounts
        fetchData('https://jsonplaceholder.typicode.com/albums');
        fetchImageData();
    }, []);

    const handleButtonClick = (endpoint, buttonName) => {
        console.log("Updating page elements.");
        fetchData(endpoint);
        fetchImageData();
        setSelectedButton(buttonName);
    };

    return (
        <main className="py-5 px-20 relative">
            {/* <div className=" bg-gray-200 rounded-2xl px-5 py-2 w-1/2 my-6 mx-auto">
                <ul className='flex justify-between items-center'>
                    <button
                        onClick={() => handleButtonClick('https://jsonplaceholder.typicode.com/albums', 'ALL')}
                        type="button"
                        className={`${selectedButton === 'ALL' ? 'bg-gray-800' : 'bg-blue-700 hover:bg-blue-800 focus:bg-gray-800'} text-white font-medium rounded-xl text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}
                    >
                        ALL
                    </button>
                    <button
                        onClick={() => handleButtonClick('https://jsonplaceholder.typicode.com/albums?userId=1', 'GEU')}
                        type="button"
                        className={`text-white ${selectedButton === 'GEU' ? 'bg-gray-800' : 'bg-blue-700 hover:bg-blue-800 focus:bg-gray-800'} font-medium rounded-xl text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}
                    >
                        GEU
                    </button>
                    <button
                        onClick={() => handleButtonClick('https://jsonplaceholder.typicode.com/albums?userId=2', 'BTL')}
                        type="button"
                        className={`text-white ${selectedButton === 'BTL' ? 'bg-gray-800' : 'bg-blue-700 hover:bg-blue-800 focus:bg-gray-800'} font-medium rounded-xl text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}
                    >
                        BTL
                    </button>
                    <button
                        onClick={() => handleButtonClick('https://jsonplaceholder.typicode.com/albums?userId=3', 'DDN')}
                        type="button"
                        className={`text-white ${selectedButton === 'DDN' ? 'bg-gray-800' : 'bg-blue-700 hover:bg-blue-800 focus:bg-gray-800'} font-medium rounded-xl text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}
                    >
                        DDN
                    </button>
                    <button
                        onClick={() => handleButtonClick('https://jsonplaceholder.typicode.com/albums?userId=4', 'HLD')}
                        type="button"
                        className={`text-white ${selectedButton === 'HLD' ? 'bg-gray-800' : 'bg-blue-700 hover:bg-blue-800 focus:bg-gray-800'} font-medium rounded-xl text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}
                    >
                        HLD
                    </button>
                </ul>
            </div> */}

            <div className="top_three w-full h-80 my-5 p-5 rounded-2xl flex">
                <div className="second w-1/3 h-full border-black flex flex-col items-center justify-end">
                    <div className="image flex items-center justify-center mb-2 ">
                        <img width={180} src={second} className='rounded-full object-cover' alt="Profile" />
                    </div>
                    <div className="text mb-2">Second</div>
                </div>
                <div className="first w-1/3 h-full border-black flex flex-col items-center justify-start">
                    <div className="image flex items-center justify-center mb-2">
                        <img width={180} src={first} className='rounded-full object-cover' alt="Profile" />
                    </div>
                    <div className="text mb-2">First</div>
                </div>
                <div className="third w-1/3 h-full border-black flex flex-col items-center justify-end">
                    <div className="image flex items-center justify-center mb-2">
                        <img width={180} src={third} className='rounded-full object-cover' alt="Profile" />
                    </div>
                    <div className="text mb-2">Third</div>
                </div>
            </div>

            <div className="board  overflow-hidden">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="w-full bg-gray-800 text-white">
                            <th className="py-2 px-4 text-start">Name</th>
                            <th className="py-2 px-4 ">University Roll No.</th>
                            <th className="py-2 px-4">Rank</th>
                            <th className="py-2 px-4">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id} className="border-b">
                                <td className="py-2 px-4">{item.title}</td>
                                <td className="py-2 px-4 text-center">{item.id}</td>
                                <td className="py-2 px-4 text-center">Rank</td>
                                <td className="py-2 px-4 text-center">100</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}

export default Leaderboard;