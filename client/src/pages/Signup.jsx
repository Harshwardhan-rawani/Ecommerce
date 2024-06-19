import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
 
  const navigate =useNavigate()
  const [strong,setstrong]=useState({
    weak : "",
    color :""
  })
  const [invalidcolor,setinvalidcolor]=useState("")

 const [data,setdata]=useState({
  username : "",
  email : "",
  pass : "",
  reppass : "",
  phone :""
 })
 const validatePassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};
const handleonchage = (e)=>{
  setdata({...data,[e.target.name]:e.target.value})
}
const handlepass = (e)=>{
  const password = e.target.value
  setdata({...data,pass:password})
  // setinvalidpass(validatePassword(password))
}
const handlesubmit = async(e)=>{

  e.preventDefault();
 
  if(data.pass === data.reppass && data.phone.length == 10){
      await handlepost()
      console.log("done")

}
else{
  setdata({
    username : data.username,
    email : data.email,
    pass : "",
    reppass : "",
    phone :""
  })
}
}
   async function handlepost(){
    try {
      
      const formdata = new FormData()
      formdata.append("username",data.username)
      formdata.append("email",data.email)
      formdata.append("password",data.pass)
      formdata.append("phone",data.phone)
       const response=await axios.post(`${import.meta.env.VITE_URL}/signup`,formdata,{
       headers : {
         'Content-Type': 'application/json'
       }
      })
 
      toast.success(response.data.message)
      setTimeout(() => {
        navigate("/login")
      }, 2000);
  
    } catch (error) {
      console.log("Data not posted",error)
     toast.error(error.response.data.message)

     setdata({
      username : data.username,
      email : "",
      pass : data.pass,
      reppass : data.reppass,
      phone :""
    })
    }
    
   }
  
  return (
   <>
   <br />
   <br />
   
    <form className= "shadow-lg  p-3 bg-gray-300 m-2  w-3/4 lg:w-1/4 mx-auto"  onSubmit={handlesubmit}>
    <center className='text-xl font-bold'>Signup</center>

    <br />
    <div className="mb-3">
    <label
      htmlFor="username"
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
      User Name
    </label>
    <input
      type="text"
      id="username"
      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
      placeholder="Username"
      required
      value={data.username}
      name = "username"
      onChange={handleonchage}
      
    />
  
  </div>
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
      value={data.email}
      name = "email"
      onChange={handleonchage}
    />
  </div>
  <div className="mb-3">
    <label
    name = "pass"
      htmlFor="password"
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
    Password
    </label>
    <input
      type="password"
      id="password"
      className={`shadow-sm bg-gray-50 ${invalidcolor} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light`}
      required
      placeholder='********'
      value={data.pass}
      name ="pass"
      onChange={handlepass}
 />
  </div>
 <p className={`${strong.color}`}>{strong.weak}</p>
  <div className="mb-3">
    <label
      htmlFor="repeat-password"
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
      Repeat Password
    </label>
    <input
      type="password"
      id="repeat-password"
      className={`shadow-sm bg-gray-50 ${invalidcolor} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light`}
      required
      placeholder='********'
      value={data.reppass}
      name= "reppass"
      onChange={handleonchage}
    />

  </div>

  <div className="mb-3">
    <label
      htmlFor="phone"
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
      Phone Number
    </label>
    <input
      type="tel"
      id="phone"
      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
      required
      placeholder='+91-XXXX-XXXX-XX'
      value={data.phone}
      name = "phone"
      onChange={handleonchage}

    />
  </div>
  <div className='mb-5'>
    <p>Already register <Link to={"/login"}><span className='text-blue-600 font-semibold'>Login in</span></Link></p>
  </div>
  <center>
  <button
    type="submit"
    className=" text-white bg-[#27374D] hover:bg-[#526D82] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  >
    Register new account
  </button>

  </center>
</form>

   </>
  )
}

export default Signup

