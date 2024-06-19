import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Items() {

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_URL}/item/api`);
        setItem(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>...loading</div>;
  if (error) return <div>{error}</div>
  return (

    <div className='bg-[#ffffff] flex justify-around mt-[40px] p-2 overflow-scroll lg:overflow-hidden lg:mt-[25px] lg:flex lg:justify-center '>
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
