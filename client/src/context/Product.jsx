import React, { useEffect, useState, useMemo } from 'react';
import { Mycontext } from './Mycontext';
import axios from 'axios';

const ProductProvider = ({ children }) => {
  const [item, setItem] = useState(null);
  const [data, setData] = useState({
    alldata: [],
    mendata: [],
    womendata: [],
    shoesdata: [],
    watchdata: [],
    earphonedata: [],
    laptopdata: [],
    ubkart: [],
    bestselling: [],
    topdeal: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [
          allProducts,
          menProducts,
          shoesProducts,
          womenProducts,
          earphoneProducts,
          watchProducts,
          laptopProducts,
          itemData
        ] = await Promise.all([
          axios.get("https://dummyjson.com/products"),
          axios.get("https://dummyjson.com/products/search?q=men"),
          axios.get("https://dummyjson.com/products/search?q=shoes"),
          axios.get("https://dummyjson.com/products/search?q=women"),
          axios.get("https://dummyjson.com/products/search?q=earphone"),
          axios.get("https://dummyjson.com/products/search?q=watch"),
          axios.get("https://dummyjson.com/products/search?q=laptop"),
          axios.get(`${import.meta.env.VITE_URL}/item/api`)
        ]);

        const allData = allProducts.data.products;

        setData({
          alldata: allData,
          mendata: menProducts.data.products,
          womendata: womenProducts.data.products,
          shoesdata: shoesProducts.data.products,
          watchdata: watchProducts.data.products,
          earphonedata: earphoneProducts.data.products,
          laptopdata: laptopProducts.data.products,
          ubkart: allData.slice(0, 9),
          bestselling: allData.slice(10, 19),
          topdeal: allData.slice(20, 29),
        });

        setItem(itemData.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({ data, item }), [data, item]);

  if (loading) {
    return (
      <div className='w-screen h-screen flex items-center justify-center'>
        <div className="w-16 h-16 spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error loading data: {error}</div>;
  }

  return (
    <Mycontext.Provider value={contextValue}>
      {children}
    </Mycontext.Provider>
  );
};

export default ProductProvider;
