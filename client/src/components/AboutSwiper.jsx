import React, { useContext, useEffect,useState } from 'react'
import {Swiper ,SwiperSlide} from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/free-mode'
import { FaRupeeSign } from "react-icons/fa";
import {FreeMode , Pagination} from 'swiper/modules'
import { Link } from 'react-router-dom'
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import axios from 'axios'
import { Authcontext } from '../context/Auth'
function AboutSwiper(props) {
  const {token} = useContext(Authcontext)
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
  return (
    <div className='z-10 w-90%  flex items-center justify-center flex-col'>
      <Swiper breakpoints={{
        340 : {slidesPerView:2,
               spaceBetween : 6
        },
        700 : {slidesPerView:3,
            spaceBetween : 0
     },
     1200 : {slidesPerView:5,
        spaceBetween : 0
 }
      }} 
      freeMode ={true}
      pagination={{ clickable: true }}
      modules = {{FreeMode,Pagination}}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
      className='w-[90%]'
      >
        {props.Image.map((e)=>{
               return   <SwiperSlide key={e.id} className=' m-1 bg-gray-200 shadow-md hover:border-2 border-gray-400  h-[35vh] relative lg:h-[22vw]'>
              
                <Link to={`/feature/${e.id}`} className='hover:text-black w-full'>
                <img src={`${e.thumbnail}`} className='xl:w-full object-contain w-52 mx-auto ' alt="" />
                <div className=' m-2 lg:p-1 h-[10vh]'>
                  <p className='text-md lg:text-md font-mono text-sm'>{e.title}</p>
                  <p className='flex items-center text-md lg:text-md font-semibold'><FaRupeeSign/>{Math.ceil((80*e.price)-(Math.ceil(80*e.price*e.discountPercentage*0.01)))} </p>
                </div>
                </Link>
                <button className='absolute top-2 right-2 text-2xl' onClick={()=>{handlelike(e.id,e.title,Math.round((e.price*80)-((e.price*80)*e.discountPercentage*0.01)),e.thumbnail)}}>{heart.find(item=>item.p_id == e.id)?<FaHeart/>:<CiHeart/>}</button>

                </SwiperSlide>
        })}

 

   
      </Swiper>
      </div>

  )
}

export default AboutSwiper
