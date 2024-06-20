import React, { useContext, useEffect, useState } from 'react'
import Carousel1 from '../components/Carousel1'
import Items from '../components/Items'

import AboutSwiper from '../components/AboutSwiper'
import { Mycontext } from '../context/Mycontext'

function Home() {
  const {data} = useContext(Mycontext)
  const [slide1,setSlide1]=useState([])
  const [slide2,setSlide2]=useState([])
  const [slide3,setSlide3]=useState([])
  const [slide4,setSlide4]=useState([])
  const [slide5,setSlide5]=useState([])

useEffect(()=>{
  setSlide1(data.laptopdata)
  setSlide2(data.watchdata)
  setSlide3(data.shoesdata)
  setSlide4(data.mendata)
  setSlide5(data.womendata)
})
  return (
    <>
    <div><Items/></div>
    <div> <Carousel1/></div>
 
  
   <br />
   <h1 className='w-[87%] m-auto text-xl overline'>Laptops</h1>
   <AboutSwiper Image={slide1}/>
   <br />
   <h1 className='w-[87%] m-auto text-xl overline '>Top Watches</h1>
   <AboutSwiper Image={slide2}/>
   <br />
   <h1 className='w-[87%] m-auto text-xl overline '>Shoes</h1>
   <AboutSwiper Image={slide3}/>
   <br />
   <h1 className='w-[87%] m-auto text-xl overline '>Mens</h1>
   <AboutSwiper Image={slide4}/>
   <br />
   <h1 className='w-[87%] m-auto text-xl overline '>Women's</h1>
   <AboutSwiper Image={slide5}/>
    </>
  )
}

export default Home
