import React, { useState,useEffect, useContext } from 'react'
import {DataContext} from "../context/Datacontext"
import men from "../assets/men.png"
import {Authcontext} from"../context/Auth"
import { useNavigate } from 'react-router-dom'
import { FaChevronDown } from "react-icons/fa";
function Profile() {
  const navigate =useNavigate()
  const {user} = useContext(DataContext)
  const {storetoken,token,deletetoken}=useContext(Authcontext)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <div className='flex flex-col items-center mt-5'>
        <div className={`flex justify-between w-screen p-2 items-center border-b-2 drop-shadow-md`}>
          <p className='text-xl font-thin text-black'>Hi! {user.username}</p>
          <div className='relative'>
            <div className='flex items-center space-x-1'  onClick={toggleDropdown}>
            <img 
              src={""} 
              alt="Profile"  
              className='h-[10vw] w-[10vw] rounded-3xl cursor-pointer' 
             
            />
            <p><FaChevronDown/></p>
            </div>
            {isDropdownOpen && (
              <div className='absolute right-0 mt-2 w-48 bg-gray-200 border border-gray-200 shadow-lg'>
               
                <button 
                  className='block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100'
                  onClick={() => {
                    deletetoken()
                    navigate("/")
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile
