import React  from 'react'
import { Link } from 'react-router-dom'
import { IoIosArrowRoundBack } from "react-icons/io";
function AdminTop() {
  return (
    <>
    <div className='bg-[#27374D] h-[6rem] pl-5  flex justify-between items-center fixed top-[-0px] z-50 border-t-2 w-screen'>
    <div className=' text-white  text-[30px] font-bold underline'>
      E Commerce
    </div>
    <Link to={"/"}><div className='text-white hover:bg-gray-500 p-6 text-[20px] h-[95px] font-normal flex items-center'>
        <div className='text-[30px]'><IoIosArrowRoundBack/></div>
        <div>Home</div>
        </div>
        </Link>
    </div>
    <br />
    <br />
    <br />
    <br />
</>
  )
}

export default AdminTop
