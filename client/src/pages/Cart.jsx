import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdCurrencyRupee } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import axios from 'axios';
import { DataContext } from '../context/Datacontext';
import { Authcontext } from '../context/Auth';

function Cart() {
  const { token } = useContext(Authcontext);
  const { user } = useContext(DataContext);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_URL}/cart`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setData(res.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching cart data:", error);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user, token]);

  const deleteData = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_URL}/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setData(prevData => prevData.filter(item => item.product_id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const updateQuantity = async (id, newQuantity) => {
    try {
      const updatedItem = { ...data.find(item => item.product_id === id), quantity: newQuantity };
      await axios.put(`${import.meta.env.VITE_URL}/cart`, updatedItem, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setData(prevData => prevData.map(item => item.product_id === id ? updatedItem : item));
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  useEffect(() => {
    const calculateTotalPrice = () => {
      let totalPrice = 0;
      data.forEach(e => {
        totalPrice += Number(e.price) * Number(e.quantity);
      });
      setTotalPrice(totalPrice);
    };

    calculateTotalPrice();
  }, [data]);

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
        <div className='fixed w-full'>
          <div className='flex justify-between items-center px-5 py-2 bg-gray-500 w-[90%] mx-auto'>
            <div className='xl:text-2xl lg:text-xl text-lg font-bold text-white'>Cart</div>
            <Link to={"/"}>
              <div className='xl:text-2xl lg:text-xl text-lg font-thin text-white flex space-x-2'><FaHome /></div>
            </Link>
          </div>
        </div>
        <br />
        <br />
        {/* product */}
        <div className='xl:w-[90%] xl:mx-auto xl:px-5 flex xl:space-x-3 '>
          <div className="lg:w-1/3 lg:static lg:block fixed bottom-0 lg:bg-transparent bg-gray-300 w-screen p-4">
            <div className='font-semibold text-lg'>Total</div>
            <div className='font-bold flex items-center text-xl text-red-800'> <MdCurrencyRupee />{totalPrice}</div>
          </div>
          <div className="lg:w-3/4 w-[90%] p-2 mx-auto z-30">
            {data.map((e, index) => (
              <div key={index} className='mt-4 relative shadow-md w-[100%] p-2 lg:p-5 flex lg:space-x-5 space-x-2 hover:bg-gray-300'>
                <Link to={`/feature/${e.product_id}`}>
                  <img src={`${e.image}`} alt="" className='xl:w-20 lg:w-16 w-14 bg-gray-300' />
                </Link>
                <div className='lg:col-start-2 lg:col-end-8'>
                  <Link to={`/feature/${e.product_id}`} className='hover:text-black'>
                    <p className='lg:text-lg lg:font-medium text-md font-medium'>{e.title}</p>
                  </Link>
                  <div className='flex xl:space-x-4 space-x-6 items-center'>
                    <div className='flex items-center text-lg mt-1'>
                      <MdCurrencyRupee />{e.price}
                    </div>
                    <div className='flex z-40'>
                      <button className='px-2 bg-gray-800 text-white font-bold' onClick={() => updateQuantity(e.product_id, Math.max(1, Number(e.quantity) - 1))}>-</button>
                      <span className='px-2 border-y-2'>{e.quantity}</span>
                      <button className='px-2 bg-gray-800 text-white font-bold' onClick={() => updateQuantity(e.product_id, Number(e.quantity) + 1)}>+</button>
                    </div>
                  </div>
                </div>
                <button className='font-bold absolute right-2 text-lg bottom-2 hover:text-red-600' onClick={() => deleteData(e.product_id)}><RiDeleteBin6Line /></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
