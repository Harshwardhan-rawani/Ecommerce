import React, { useState } from 'react';
import axios from 'axios';

function Homeitem() {
  const [data, setData] = useState({
    filename: '',
    photo: null
  });

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleImageUpload = (event) => {
    setData({ ...data, photo: event.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('photo', data.photo);
    formData.append('filename', data.filename);
    
    try {
      const response = await axios.post('http://localhost:5000/admin/homeitems', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading the image:', error);
    }
  };

  return (
    <div className='text-white inline-block lg:w-[1100px] w-[450px] absolute top-[120px] rounded-md shadow-sm h-[585px] overflow-scroll'>
      <h1 className='text-white bg-[#27374D] text-center p-2 rounded-t-md font-medium fixed w-[450px] lg:w-[1100px]'>Form</h1>
      <div className='flex justify-center p-3 mt-5'>
        <form  className='w-50' onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="filename" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">File Name</label>
            <input
              type="text"
              value={data.filename}
              id="filename"
              onChange={handleChange}
              name="filename"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="photo">Upload file</label>
            <input
              name="photo"
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="photo"
              type="file"
            />
          </div>
          <center>
            <button className='bg-[#27374D] mt-5 p-2 rounded-md w-50 hover:bg-gray-700 font-medium'>POST</button>
          </center>
        </form>
      </div>
    </div>
  );
}

export default Homeitem;
