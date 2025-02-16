import React, { useEffect, useState } from 'react';
import profileImage from './assets/profile.png';

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
        console.log("Updating page elements.")
        fetchData(endpoint);
        fetchImageData();
        setSelectedButton(buttonName);
    };

    return (
        <>
            <div className="top_bar bg-gray-200 rounded-2xl px-5 py-2">
                <ul className='flex justify-between items-center'>
                    <button
                        onClick={() => handleButtonClick('https://jsonplaceholder.typicode.com/albums', 'ALL')}
                        type="button"
                        className={`text-white ${selectedButton === 'ALL' ? 'bg-gray-800' : 'bg-blue-700 hover:bg-blue-800 focus:bg-gray-800'} font-medium rounded-xl text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}
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
                        className={`text-white ${selectedButton==='HLD'?'bg-gray-800' : 'bg-blue-700 hover:bg-blue-800 focus:bg-gray-800'} font-medium rounded-xl text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}
                    >
                        HLD
                    </button>
                </ul>
            </div>

            <div className="top_three w-full h-80 my-5 p-5 rounded-2xl flex">
                <div className="second w-1/3 h-full border-black flex flex-col items-center justify-end">
                    <div className="image flex items-center justify-center mb-2">
                        <img width={180} src={second} className='rounded-full' alt="Profile" />
                    </div>
                    <div className="text mb-2">Second</div>
                </div>
                <div className="first w-1/3 h-full border-black flex flex-col items-center justify-start">
                    <div className="image flex items-center justify-center mb-2">
                        <img width={180} src={first} className='rounded-full' alt="Profile" />
                    </div>
                    <div className="text mb-2">First</div>
                </div>
                <div className="third w-1/3 h-full border-black flex flex-col items-center justify-end">
                    <div className="image flex items-center justify-center mb-2">
                        <img width={180} src={third} className='rounded-full' alt="Profile" />
                    </div>
                    <div className="text mb-2">Third</div>
                </div>
            </div>

            <div className="board rounded-2xl overflow-hidden">
                <div className="flex p-4 bg-black text-white text-2xl rounded-2xl">
                    <div className="py-2 px-4 w-1/3">Name</div>
                    <div className="py-2 px-4 w-1/3">University Roll No.</div>
                    <div className="py-2 px-4 w-1/3">Score</div>
                </div>
                {data.map((item) => (
                    <div key={item.id} className="flex my-2 border-2 rounded-xl bg-blue-200">
                        <div className="px-4 py-2 w-1/3">{item.title}</div>
                        <div className="px-4 py-2 w-1/3">{item.id}</div>
                        <div className="px-4 py-2 w-1/3">100</div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Leaderboard;