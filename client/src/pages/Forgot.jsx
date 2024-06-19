import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Authcontext } from '../context/Auth'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
function Forgot() {
  const navigate=useNavigate()
  const {token,login}=useContext(Authcontext)
  const [data,setData]=useState({
    email:"",
    password:"",
    confirm_password:""
  })

  const handleonchange = (e)=>{
    const {name,value}=e.target
    setData({...data,[name]:value})
  }
  const handlesubmit = async(e)=>{
    e.preventDefault()
    try {
      const formdata =new FormData()
      formdata.append("email",data.email)
      formdata.append("password",data.password)
      formdata.append("confirm_password",data.confirm_password)
      const response = await axios.put(`${import.meta.env.VITE_URL}/forgot`,formdata,{
  headers:{
    "Authorization": `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
      })
      toast.success(response.data.message)
      navigate("/login")
      
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error) 
      
    }
  }
  
  return (
   <>
    <div className='h-[80vh] xl:w-full flex justify-center items-center'>

<div className='bg-gray-200 xl:py-5 xl:px-5 xl:w-1/4 shadow-md rounded-md w-3/4'>
  
  <form className='w-full' onSubmit={handlesubmit}>
    <div className='text-center font-bold xl:text-xl xl:border-b-2'>
        Forgot Password
    </div>
    <br />
    <div className='m-3 font-medium'>
      <label htmlFor="email">Valid Email</label>
      <br />
      <input onChange={handleonchange} value={data.email} className='xl:h-10 p-2 w-full focus:outline-none rounded-md' placeholder='email@gmail.com' type="email" name="email" id="email" />
    </div>
    <div className='m-3 font-medium'>
      <label htmlFor="password">New password</label>
      <br />
      <input onChange={handleonchange} value={data.password} className='xl:h-10 p-2 w-full focus:outline-none rounded-md' placeholder='**********' type="password" name="password" id="password" />
    </div>
    <div className='m-3 font-medium'>
      <label htmlFor="confirm_password" >Confirm_Password</label>
      <br />
      <input className='xl:h-10 p-2 w-full focus:outline-none rounded-md' onChange={handleonchange} value={data.confirm_password} placeholder='**********' type="password" name="confirm_password" id="confirm_password" />
    </div>
    <br />
    <div className='flex justify-center'>
      <button className='xl:py-2 xl:px-5 bg-slate-500 font-bold text-white rounded-md px-3 py-2 mb-3 bg-gray-600'>Change</button>
    </div>
  </form>
</div>
</div>

   </>
  )
}

export default Forgot
