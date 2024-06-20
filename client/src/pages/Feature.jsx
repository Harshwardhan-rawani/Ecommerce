import React, { useContext, useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom'
import axios from 'axios'
import { FaRegStar } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";
import { DataContext } from '../context/Datacontext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import 'react-toastify/dist/ReactToastify.css';
import { Authcontext } from '../context/Auth';
function Feature() {
  const navigate =useNavigate()
    const {user}=useContext(DataContext)
    const { id } = useParams();
    const {token} = useContext(Authcontext)
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [image,setimage]=useState(null)
    const [heart,setheart]=useState([])
  const [wishlist,setwishlist]=useState(null)
  const handlelike=async(id,title,price,image)=>{
    setheart(prev => !prev.find(item => item.p_id == id)?[...prev,{p_id:id,p_title:title,p_price:price,p_image:image}]:prev)
   setwishlist({p_id:id,p_title:title,p_price:price,p_image:image})
 }
 useEffect(() => {
  const postData = async () => {
    try {
      if(wishlist){
        const res = await axios.post(`${import.meta.env.VITE_URL}/wishlist`, wishlist, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(res.data.message);
      }
    } catch (error) {
      console.error('Error posting data:',error);
    }
  };

  postData();
}, [wishlist]); 
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
  
  };

  getData();
}, []);
    const [Add,setadd]=useState("Add to cart")
    const getProduct = async () => {
      try {
        const res = await axios.get(`https://dummyjson.com/products/${id}`);
        setData(res.data);
        setimage(res.data.images[0])
     
        setLoading(false);
      } catch (err) {
        setError('Error fetching data');
        setLoading(false);
      }
    };
  
    useEffect(() => {
      getProduct();
    }, [id]);
   
 

    const send_to_cart = async()=>{
      if(user){
     try{
      const formData = new FormData();
      formData.append("user_id",user._id)
      formData.append("product_id",data.id)
      formData.append("quantity","1")
      formData.append("price",Math.round((data.price*80)-((data.price*80)*data.discountPercentage*0.01)))
      formData.append("image",data.thumbnail)
      formData.append("title",data.title)
      setadd("Go to cart")
      const response= await axios.post(`${import.meta.env.VITE_URL}/cart`, formData ,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
       })
    
     }
     catch(error){
      console.error('Error uploading :', error);
      toast.error(error.response.data.message)
     }
    }
    else{
    navigate("/login")
    }
    }

    if (loading) {
      return  <div className='w-screen h-screen flex items-center justify-center'><div className="w-16 h-16 spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
      </div></div>
      
        }
  if (error) return <div>{error}</div>;
  return (
   <div className=' mt-[8vh] ml-5 h-[40vw] grid grid-cols-1 gap-4 lg:grid lg:grid-cols-2 lg:gap-2 lg:m-20'>
    {/* left */}
     <div className=' relative grid grid-cols-5'>
     
        <div className='flex flex-col justify-top'>
         {data.images.map((e,index)=>{
           return <img src={`${e}`} key={index} onMouseOver={()=>{setimage(e)}} alt="" className='bg-black w-[8vw] h-[8vw] lg:w-[5vw] lg:h-[5vw]   hover:translate-x-2 shadow-2xl mt-1'/>
         })}
                
        </div>
        <div className="col-start-2 col-end-5">
            <img src={`${image}`} alt="" className='h-[60vw] lg:h-[30vw]'/>
            <button className='absolute top-4 right-10  text-4xl' onClick={()=>{handlelike(data.id,data.title,Math.round((data.price*80)-((data.price*80)*data.discountPercentage*0.01)),data.thumbnail)}}>{heart.find(item=>item.p_id == data.id)?<FaHeart/>:<CiHeart/>}</button>
        </div>
     </div>
     {/* right */}
     <div className=''>
        <h1 className='text-lg font-medium'>{data.title}</h1>
        <p  className='italic'>{data.category}</p>
        <br />
        <p className='text-md'>{data.description}</p>
        <br />
        <p className='flex items-center text-2xl'><FaRupeeSign/>{Math.round((80*data.price)-(Math.ceil(80*data.price*data.discountPercentage*0.01)))}.00 <span className='ml-5 flex items-center text-gray-500 line-through'><FaRupeeSign/>{Math.ceil(data.price*80)}.00</span></p>
        <br />
        <p className='flex items-center gap-1'><FaRegStar/><FaRegStar/><FaRegStar/><FaRegStar/><FaRegStar/>{data.rating}</p>
        <br />
        <p>{data.warrantyInformation}</p>
        <br />
        <p className={`text-xl ${data.stock <=5 ? "text-red-600":"text-black"}`}>Stock: {data.stock} <span className='ml-2 text-lg'>{data.availabilityStatus}</span> </p>
        <br />
        <p>{data.shippingInformation}</p>
        <br />
        <div className='flex xl:justify-between flex-col space-y-2 w-5/6 m-auto '>
            <button className='bg-green-400 text-xl font-medium p-1 shadow-md rounded-md hover:bg-green-500  lg:w-[20vw] w-full'>Buy</button>
            <button className='bg-yellow-400 text-xl font-medium p-1 shadow-md rounded-md hover:bg-yellow-500 w-full lg:w-[20vw]' onClick={send_to_cart} >{Add}</button>
        </div>
     
        <h1 className='text-2xl mt-4'>Review</h1>
        <br />
        {data.reviews.map((e,index)=>{
            return <div className=' p-2 border-black border-y-2 mt-2 mr-2' key={index}>
            
                <div >
                <p className='font-medium'>{e.reviewerName}</p>
                <p className='italic text-sm'>{e.reviewerEmail}</p>
                </div>
                <p className='mt-1 text-sm '>Comment: {e.comment}</p>
          
                <p className='text-sm mt-2 italic'>{e.date}</p>
            </div>
     
        })}
     </div>
    
   </div>
  )
}

export default Feature
