import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaRegStar, FaRupeeSign, FaHeart } from 'react-icons/fa';
import { CiHeart } from 'react-icons/ci';
import { DataContext } from '../context/Datacontext';
import { Authcontext } from '../context/Auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Feature() {
  const navigate = useNavigate();
  const { user } = useContext(DataContext);
  const { id } = useParams();
  const { token } = useContext(Authcontext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const [add, setAdd] = useState("Add to cart");
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

  const handleLike=async(id,title,price,image)=>{
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


  const getProduct = async () => {
    try {
      const res = await axios.get(`https://dummyjson.com/products/${id}`);
      setData(res.data);
      setImage(res.data.images[0]);
      setLoading(false);
    } catch (err) {
      setError('Error fetching data');
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  const sendToCart = async () => {
    if (user) {
      try {
        const formData = new FormData();
        formData.append('product_id', data.id);
        formData.append('quantity', '1');
        formData.append('price', Math.round(data.price * 80 - (data.price * 80 * data.discountPercentage * 0.01)));
        formData.append('image', data.thumbnail);
        formData.append('title', data.title);
        setAdd('Go to cart');
        await axios.post(`${import.meta.env.VITE_URL}/cart`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      } catch (error) {
        console.error('Error uploading:', error);
        toast.error(error.response.data.message);
      }
    } else {
      navigate('/login');
    }
  };



  if (loading) {
    return (
      <div className='w-screen h-screen flex items-center justify-center'>
        <div className="w-16 h-16 spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) return <div>{error}</div>;

  return (
    <div className='mt-[8vh] ml-5 h-[40vw] grid grid-cols-1 gap-4 lg:grid lg:grid-cols-2 lg:gap-2 lg:m-20'>
      {/* left */}
      <div className='relative grid grid-cols-5'>
        <div className='flex flex-col justify-top'>
          {data.images.map((e, index) => (
            <img src={`${e}`} key={index} onMouseOver={() => setImage(e)} alt="" className='bg-black w-[8vw] h-[8vw] lg:w-[5vw] lg:h-[5vw] hover:translate-x-2 shadow-2xl mt-1' />
          ))}
        </div>
        <div className="col-start-2 col-end-5">
          <img src={`${image}`} alt="" className='h-[60vw] lg:h-[30vw]' />
          <button className='absolute top-2 right-2 text-2xl' onClick={() => handleLike(data.id, data.title, Math.round(data.price * 80 - (data.price * 80 * data.discountPercentage * 0.01)), data.thumbnail)}>
            {heart.find(item => item.p_id === data.id) ? <FaHeart /> : <CiHeart />}
          </button>
        </div>
      </div>
      {/* right */}
      <div>
        <h1 className='text-lg font-medium'>{data.title}</h1>
        <p className='italic'>{data.category}</p>
        <br />
        <p className='text-md'>{data.description}</p>
        <br />
        <p className='flex items-center text-2xl'><FaRupeeSign />{Math.round(80 * data.price - Math.ceil(80 * data.price * data.discountPercentage * 0.01))}.00 <span className='ml-5 flex items-center text-gray-500 line-through'><FaRupeeSign />{Math.ceil(data.price * 80)}.00</span></p>
        <br />
        <p className='flex items-center gap-1'><FaRegStar /><FaRegStar /><FaRegStar /><FaRegStar /><FaRegStar />{data.rating}</p>
        <br />
        <p>{data.warrantyInformation}</p>
        <br />
        <p className={`text-xl ${data.stock <= 5 ? "text-red-600" : "text-black"}`}>Stock: {data.stock} <span className='ml-2 text-lg'>{data.availabilityStatus}</span> </p>
        <br />
        <p>{data.shippingInformation}</p>
        <br />
        <div className='flex xl:justify-between flex-col space-y-2 w-5/6 m-auto'>
          <button className='bg-green-400 text-xl font-medium p-1 shadow-md rounded-md hover:bg-green-500 lg:w-[20vw] w-full'>Buy</button>
          <button className='bg-yellow-400 text-xl font-medium p-1 shadow-md rounded-md hover:bg-yellow-500 w-full lg:w-[20vw]' onClick={sendToCart}>{add}</button>
        </div>
        <h1 className='text-2xl mt-4'>Review</h1>
        <br />
        {data.reviews.map((e, index) => (
          <div className='p-2 border-black border-y-2 mt-2 mr-2' key={index}>
            <div>
              <p className='font-medium'>{e.reviewerName}</p>
              <p className='italic text-sm'>{e.reviewerEmail}</p>
            </div>
            <p className='mt-1 text-sm'>Comment: {e.comment}</p>
            <p className='text-sm mt-2 italic'>{e.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feature;
