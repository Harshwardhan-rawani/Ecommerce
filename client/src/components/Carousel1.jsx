import React, { useContext, useEffect, useState } from 'react'
import { Carousel } from "flowbite-react";
import { Link } from 'react-router-dom';
import { SliderContext } from '../context/Slidercontext';
function Carousel1() {
  const { data } = useContext(SliderContext);
  const [pro, setPro] = useState(null);

  useEffect(() => {
    if (data) {
      setPro(data);
    }
  }, [data]); 

  if(!pro) return <div>..loading</div>
  return (
    <div className="z-10 h-56 sm:h-64 xl:h-90  xl:mt-[-20px]">
    <Carousel onSlideChange={(index) => console.log('onSlideChange()', index)}>
    
      {pro.map((e,index)=>{
        return <Link to={`/feature/${e.id}`} key={index}> <div className="flex h-full items-center justify-center bg-gray-500 dark:bg-gray-700 dark:text-white">
           <img src={`${e.thumbnail}`} alt="" />
         </div>
         </Link> 
      })}
   
   
    </Carousel>
    </div>
  )
}

export default Carousel1
