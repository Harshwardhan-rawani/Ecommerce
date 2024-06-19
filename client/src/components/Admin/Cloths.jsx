import React from 'react'

function Cloths() {
  return (
    <div className=' text-white inline-block lg:w-[1100px] w-[450px] absolute top-[120px] rounded-md shadow-sm h-[585px] overflow-scroll'>
    <h1 className='text-white bg-[#27374D] text-center p-2 rounded-t-md font-medium fixed lg:w-[1100px] w-[450px]'>Form</h1>
    
    <div className='flex justify-center p-3 mt-5'>

<form method='POST' className='w-50'>
<div className="mb-6">
<label for="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">File Name</label>
<input type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
</div>

<div className="mb-6">
<label for="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
<input type="number" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
</div>
<div>

<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
<input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />

</div>
<center>
<button type='submit' className='bg-[#27374D] mt-5 p-2 rounded-md w-50 hover:bg-gray-700 font-medium'>POST</button>
</center>
</form>
</div>
  </div>
  )
}

export default Cloths
