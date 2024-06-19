import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Authcontext } from '../context/Auth';
import { useNavigate } from 'react-router-dom';
function Login() {

 const navigate =useNavigate()
  const { storetoken ,token} = useContext(Authcontext)
  const [data,setdata]=useState({
    email :"",
    pass:""
  })

  const handleonchange = (event)=>{
        const name = event.target.name
        const value = event.target.value
        setdata({...data,[name]:value})
      }

  const handlesubmit = async(event)=>{
    event.preventDefault()
    handlepost()

   
  }

  const handlepost = async()=>{
    try {
      const formdata =new FormData()
      formdata.append("email",data.email)
      formdata.append("pass",data.pass)
      const response = await axios.post(`${import.meta.env.VITE_URL}/login`,formdata,{
        headers : {
          'Content-Type': 'application/json'
        
      }})
 
    storetoken(response.data.token)
    toast.success(response.data.message)
    setTimeout(() => {
      navigate("/")
    },2000);
    } catch (error) {
      console.log("error",error)

      toast.error(error.response.data.message)
      setdata({
        email :"",
        pass:""
      })
    }

  }

  return (
    <>
    <br />
    <br />
    <br />
      <form className="shadow-xl  p-3 bg-gray-200 m-2 w-3/4 lg:w-1/4 mx-auto"  onSubmit={handlesubmit} method='post'>
  <center className='text-xl font-bold'>Login</center>
  <div className="mb-3">
    <label
      htmlFor="email"
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
       Email
    </label>
    <input
      type="email"
      id="email"
      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
      placeholder="name@email.com"
      required
      name = "email"
      value = {data.email}
      onChange={handleonchange}
    />
  </div>
  <div className="mb-1">
    <label
      htmlFor="password"
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
    Password
    </label>
    <input
      type="password"
      id="password"
      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
      required
      placeholder='********'
      name = "pass"
      value ={data.pass}
      onChange={handleonchange}
    />
  </div>
 
 <Link to={"/forgotpass"}><div className='underline mb-2 text-end'>Forgot password</div></Link> 
  <div className='mb-5'>
    <p>Not register <Link to={"/signup"}><span className='text-blue-600 font-semibold'>Sign up</span></Link></p>
  </div>
  <center>
  <button
    type="submit"
    className=" text-white bg-[#27374D] hover:bg-[#526D82] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  >
    Login in
  </button>
  
  </center>
</form>

    </>
  )
}

export default Login
