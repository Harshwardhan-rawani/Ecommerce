import React, { useContext} from 'react';

import { Link } from 'react-router-dom';
import { Mycontext } from '../context/Mycontext';

function Items() {

 const {data,item}=useContext(Mycontext)
  return (

    <div className='bg-[#ffffff] flex justify-around mt-[30px] p-2 overflow-scroll lg:overflow-hidden lg:mt-[25px] lg:flex lg:justify-center '>
  { item.map((r,index)=>{
  return<Link to={`/product/${r.filename}`} className='mx-3' key={index}> <div>
        
   <img 
     src={`${import.meta.env.VITE_URL}/${r.photo}`} 
     alt=""
     className='rounded-[2vw] w-[15vw] h-[10vw] bg-white drop-shadow-lg hover:border-2 border-gray-400 lg:w-[4vw] lg:h-[4vw]'
   />
   <p className='text-[#27374D] text-center text-xs' >{r.filename}</p>
 </div>
 </Link>
  })
}
     
    
    </div>
  );
}

export default Items;
