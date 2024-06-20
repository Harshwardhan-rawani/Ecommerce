import React, { useContext, useEffect,useState } from 'react'
import { Link } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { MdCurrencyRupee } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Authcontext } from '../context/Auth';
import axios from 'axios';


function Likedlist() {
  const [heart,setheart]=useState([])
  const {storetoken,token}=useContext(Authcontext)
  const [loading,setLoading]=useState(true)
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_URL}/wishlist`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setheart(res.data)
      } catch (error) {
        console.error('Error posting data:', error);
      }
     finally{
      setLoading(false)
     }
    };
  
    getData();
  }, []);
  const handledelete = async(id)=>{
      setheart(heart.filter(items=> items.p_id !==id))
      await axios.delete(`${import.meta.env.VITE_URL}/wishlist/${id}`,{
        headers:{
          Authorization : `Bearer ${token}`
        }
      })
  }
  if (loading) {
    return (
      <div className='w-screen h-screen flex items-center justify-center'>
        <div className="w-16 h-16 spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  return (
    <>
    <div className='w-100 relative xl:mt-10 lg:mt-12 mt-14'>
      {/* witchlisttop */}

      <div className='w-full'>      
    <div className=' flex justify-between items-center px-5 py-2 bg-gray-500 w-[90%] mx-auto'>
      <div className='xl:text-2xl lg:text-xl text-lg font-bold text-white'>WishList</div>
     <Link to={"/"}><div className='xl:text-2xl lg:text-xl text-lg font-thin text-white flex space-x-2' ><FaHome /></div></Link> 
    </div>

      </div>
   <br />
   {/* product */}
   <div className='w-[90%] mx-auto px-4'>
         {heart.map((e, index) => (
          <div key={index} className='my-3 relative shadow-md w-full p-2 lg:p-5 flex lg:space-x-5 space-x-2 hover:bg-gray-300'>
            <Link to={`/feature/${e.p_id}`}><img src={`${e.p_image}`} alt="" className='xl:w-20 lg:w-16 w-14 bg-gray-300' /></Link>
            <div className='lg:col-start-2 lg:col-end-8'>
              <Link to={`/feature/${e.p_id}`} className='hover:text-black'>
                <p className='lg:text-lg lg:font-medium text-md font-medium'>{e.p_title}</p>
              </Link>
              <div className='flex xl:space-x-4 space-x-6 items-center'>
                <div className='flex items-center text-lg mt-1'>
                  <MdCurrencyRupee />{e.p_price}
                </div>
             
              </div>
            </div>
            <button className='font-bold absolute right-2 text-lg bottom-2 hover:text-red-600' onClick={() => handledelete(e.p_id)}><RiDeleteBin6Line /></button>
          </div>
        ))}
       
       

          
        
   </div>
    </div>
  
    </>
 
  )
}

export default Likedlist
