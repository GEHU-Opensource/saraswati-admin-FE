import React, { useState } from 'react';

const PopUp = ({ user, ExitPopUp, notifyFUN, updateStudent }) => {
  const [name, setName] = useState(user.title);
  const [section, setSection] = useState("B.Tech CSE III D");

  const handleClick = () => {
    updateStudent(user.id, name, section);
    notifyFUN();
    ExitPopUp();
  }

  console.log("user", user);

  return (
    <section
      className='fixed top-0 left-0 w-full h-screen flex justify-center items-center z-10 p-5'
      style={{ backgroundColor: 'rgba(128, 128, 128, 0.55)' }} // Using inline style for background color with opacity
      onClick={ExitPopUp}
    >
      <div className='p-10 rounded-3xl bg-white max-w-lg max-h-[80vh] w-full relative' onClick={(e) => { e.stopPropagation(); }}>
        <div className='flex items-center justify-end mb-4'>
          <button onClick={ExitPopUp} className=''>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 48 48">
              <path fill="#f44336" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path>
              <path fill="#fff" d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z"></path>
              <path fill="#fff" d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z"></path>
            </svg>
          </button>
        </div>
        <div className='text-center text-black mb-4 flex-col text-2xl'>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Update Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="section">
                Update Section
              </label>
              <input
                type="text"
                id="section"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter section"
              />
            </div>
          </form>
        </div>
        <div className='flex items-center justify-center mx-1'>
          <button onClick={handleClick}
            className="px-8 py-1 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200">
            Update
          </button>
        </div>
      </div>
    </section>
  )
}

export default PopUp;