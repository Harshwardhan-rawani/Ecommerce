import React, { useState ,useContext, useEffect, useRef} from 'react'
import { useSpring, animated } from '@react-spring/web';
import { FaRupeeSign } from "react-icons/fa";
import { SliderContext } from '../context/Slidercontext';
import { Link, useLocation, useParams } from 'react-router-dom';
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { RiMenu3Line } from "react-icons/ri";
import axios from 'axios';
import { Authcontext } from '../context/Auth';
function Product() {
  const {token}=useContext(Authcontext)
  const dropdownRef = useRef(null);
  const [openclose,setopenclose]=useState(null)
  const {id}=useParams()
   const [pro,setpro]=useState([])

   const [loading,setLoading]=useState(true)
   const [heart,setheart]=useState([])
  const [wishlist,setwishlist]=useState(null)

  const deleteWishlist = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_URL}/wishlist/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Product removed from wishlist successfully');
    } catch (error) {
      console.error('Error removing product from wishlist:', error);
    }
  };

  const handlelike=async(id,title,price,image)=>{
    const product = {p_id:id,p_title:title,p_price:price,p_image:image}
    if(!heart.find(item => item.p_id==id)){
      setheart(prev => !prev.find(item => item.p_id == id)?[...prev,product]:prev)
      setwishlist(product)
    }
  else{
    console.log(heart.filter(item => Number(item.p_id) !==Number(id)))
    setheart(heart.filter(item => Number(item.p_id) !== Number(id)))
    deleteWishlist(id);
  
   
  }
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
      setheart(res.data[0].products)
    } catch (error) {
      console.error('Error posting data:', error);
    }
  
  };

  getData();
}, []);
   useEffect(()=>{
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products/search?q=${id}`);
        setpro(response.data.products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setLoading(false);
      }
    };

    fetchProduct();
   },[id])

   const Hideshow = ()=>{

      setopenclose(!openclose)
   }
   const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setopenclose(false);
     
    }
  };
  
   useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
 
// console.log(heart.find(item =>item.p_id == 187))
if (loading) {
  return  <div className='w-screen h-screen flex items-center justify-center'><div className="w-16 h-16 spinner-border" role="status">
  <span className="visually-hidden">Loading...</span>
  </div></div>
  
    }

   
  return (
 <>
    <div className='xl:mt-10 lg:mt-12 mt-14 w-screen'>
     <div className=" w-[90%] mx-auto  xl:flex xl:space-x-5">
<div className='relative xl:w-1/4  xl:p-5'>
<div className='w-full bg-gray-600 text-end px-3 xl:hidden'><button className='text-white font-bold text-xl py-2 flex justify-between items-center w-full' onClick={Hideshow}><span>{id}</span><RiMenu3Line /></button></div>
<div className={`xl:w-full border-t-2 xl:border-gray-300 border-gray-400 xl:h-[80vh]  xl:block ${openclose?"bg-[#ffffffc8] text-black w-full absolute top-10 z-30 p-3":"hidden"} `}   ref={dropdownRef}>
 <div className='xl:p-2 font-bold '>
  <div className='xl:block hidden xl:text-center xl:text-xl lg:text-lg text-md '>{id}</div>
  <div>hello</div>
 </div>
</div>
</div>

     <div className="xl:w-3/4 w-full xl:p-5 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:mt-0 mt-2">
         {pro.map((e,index)=>{
  
     return   <div className='relative' key={index}>
      <Link to={`/feature/${e.id}`}>
      <div className='bg-gray-200 relative hover:text-black hover:bg-gray-300'>
        <img  src={`${e.thumbnail}`} alt="" />
        <div className='p-2 '>
        <p className='font-mono mb-2 text-sm'>{e.title}</p>
          <p className='flex items-center font-semibold'><FaRupeeSign/>{Math.ceil((80*e.price)-(Math.ceil(80*e.price*e.discountPercentage*0.01)))} </p>

        </div>
     </div>
     </Link>
             <button className='absolute top-2 right-2 text-2xl' onClick={()=>{handlelike(e.id,e.title,Math.round((e.price*80)-((e.price*80)*e.discountPercentage*0.01)),e.thumbnail)}}>{heart.find(item=>item.p_id == e.id)?<FaHeart/>:<CiHeart/>}</button>
             </div>
  })} 
     </div>
     </div>
    </div>

 </>
  )
}

export default Product
