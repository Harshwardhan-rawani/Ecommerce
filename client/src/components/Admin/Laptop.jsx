import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

function Laptop() {
  const [data,setData]=useState({
    filename : "",
    price : "",
    description : "",
    photo : ""
  })

  const handleinput = (e)=>{
    setData({...data,[e.target.name]:e.target.value})
    
  } 

  const handleimage = (e)=>{
    setData({...data,photo:e.target.file[0]})
  }
 const handlesubmit = (e)=>{
     e.preventDefault()
 }
  return (
    <div className=' text-white inline-block lg:w-[1100px] w-[450px] absolute top-[120px] rounded-md shadow-sm h-[585px] overflow-scroll'>
      <h1 className='text-white bg-[#27374D] text-center p-2 rounded-t-md font-medium fixed w-[450px] lg:w-[1100px]'>Form</h1>
    <div className='flex justify-center p-3 mt-5'>

    <form method='POST' className='w-50' onSubmit={handlesubmit}>
    <div class="mb-6">
    <label for="filename" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">File Name</label>
    <input type="text" value={data.filename} onChange={handleinput} id="filename"  name="filename" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

     </div>
     <div class="mb-6">
    <label for="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
    <input type="text" value={data.price} onChange={handleinput}  id="price"  name="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

     </div>
     <div class="mb-6">
    <label for="discription" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
    <textarea rows={"4"} value={data.description} onChange={handleinput} cols={"50"} id="discription"  name="discription" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

     </div>
<div>
  
<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="photo">Upload file</label>
<input name="photo" value={data.photo} onChange={handleimage}  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="photo" type="file" />

</div>
<center>
<button type='submit' className='bg-[#27374D] mt-5 p-2 rounded-md w-50 hover:bg-gray-700 font-medium'>POST</button>
</center>
    </form>
    </div>
    </div>
  )
}

export default Laptop
