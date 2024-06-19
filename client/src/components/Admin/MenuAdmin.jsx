import React, { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'


function MenuAdmin() {
const location =useLocation()

  return (
    <>
    <div className='h-[585px] m-4 inline-block lg:w-[20em] w-[15rem]'>
      <div className='scroll-smooth shadow-md rounded-md h-full overflow-scroll'>
       <h1 className='bg-[#27374D] text-center font-medium text-white p-2'>Menu</h1>
       <div className='p-3'>
       <Link to={"/admin/homeitems"} ><div className={`text-lg font-medium hover:bg-gray-500 hover:text-white ${location.pathname==="/admin/homeitems" ? "bg-[#27374D] text-white":"bg-[#f4f3f3]"} p-1`}>HomeItems</div></Link>
       <Link to={"/admin/laptop"}><div className={`text-lg font-medium  hover:bg-gray-500 hover:text-white ${location.pathname==="/admin/laptop" ? "bg-[#27374D] text-white":"bg-[#f4f3f3]"} p-1`}>Laptop</div></Link>
/
      </div>
      </div>
    </div>
    <Outlet />
    </>
  )
}

export default MenuAdmin
