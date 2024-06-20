import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaSearch } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaHouseChimneyUser } from "react-icons/fa6";
import { Authcontext } from '../context/Auth';
import { useNavigate } from 'react-router-dom';

function Top() {
  
 
  const navigate = useNavigate()
  const dropdownRef = useRef(null);
  const [data,setdata]=useState({
    search : ""
  })
  const { token } = useContext(Authcontext);
  const [menuVisibility, setMenuVisibility] = useState("hidden");

  const toggleUserMenu = () => {
    setMenuVisibility(prevState => (prevState === "hidden" ? "block" : "hidden"));
  };
  const handlechange = (e)=>{
   
    setdata({...data,[e.target.name]:e.target.value})
  }
const handlesubmit = (e)=>{
  e.preventDefault()
  navigate(`/product/${data.search}`)
}
const handleClickOutside = (event) => {
  if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
    setMenuVisibility("hidden");
   
  }
};

useEffect(() => {
  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);

  return (
    <> 
    <div className='relative top-0'>
    <nav className='fixed z-50 bg-gray-800 w-full lg:fixed lg:z-50 lg:w-screen lg:flex lg:items-center lg:justify-between lg:px-16 lg:py-2 py-2'>
        <Link to={"/"} className='text-md hover:text-white text-start m-2 font-bold text-white '>UB Kart</Link>
        <form className='mt-2' onSubmit={handlesubmit}>
          <div className='flex justify-center w-full'>
            <input 
              type="text" 
              placeholder='Search....' 
              className='md:w-[300px] lg:focus:outline-none lg:focus:ring lg:focus:ring-[#27374D] 
                         w-[90%] h-10 rounded-l-md m-1'
              value = {data.search}
              name="search"
              onChange={handlechange}
            />
            <label 
              htmlFor="search" 
              className='rounded-r-md hover:bg-[#526D82] mt-1 bg-white text-gray-900  font-black text-xl mr-1
                         lg:bg-[#27374D] w-10 h-10 flex justify-center items-center'
            >
              <FaSearch />
            </label>
          </div>
        </form>
        <div 
          className=' absolute top-0 right-0 text-xl h-8 w-10 flex justify-center items-center text-white p-2 lg:hidden' 
          onClick={toggleUserMenu}
          
        >
          <FaHouseChimneyUser />
        </div>
        <div 
           ref={dropdownRef}
          className={`absolute top-7 bg-gray-200 w-[120px] right-2 p-2 transition-all duration-300 ${menuVisibility} shadow-lg lg:bg-transparent lg:static lg:flex lg:min-w-[200px] lg:justify-between`}
        >
          <Link to={token ? "/wishlist" : "/login"}>
            <div className="lg:text-2xl lg:text-white text-xl text-[#27374D] hover:text-[#526D82] m-2 flex items-center">
              <CiCirclePlus />
              <span className='lg:hidden ml-3 text-sm font-medium'>Mylist</span>
            </div>
          </Link>
          <Link to={token ? "/cart" : "/login"}>
            <div className="lg:text-2xl lg:text-white text-xl text-[#27374D] hover:text-[#526D82] m-2 flex">
              <FaShoppingCart />
              <span className='lg:hidden text-sm ml-3 font-medium'>Cart</span>
            </div>
          </Link> 
          <Link to={token ? "/profile" : "/login"}>
            <div className="lg:text-2xl lg:text-white text-xl text-[#27374D] hover:text-[#526D82] m-2 flex items-center">
              <FaUserCircle />
              <span className='lg:hidden ml-3 text-sm font-medium'>Profile</span>
            </div>
          </Link>
          <Link to={token ? "" : "/login"}>
            <div className="lg:text-2xl lg:mt-[2px] lg:ml-6 text-lg text-white hover:text-[#526D82] text-center  font-bold bg-gray-600 lg:bg-transparent cursor-pointer">
              {token ? "" : "Login"}
            </div>
          </Link>
        </div>
      </nav>
    </div>
      
      <br />
      <br />
    
     
    </>
  );
}

export default Top
