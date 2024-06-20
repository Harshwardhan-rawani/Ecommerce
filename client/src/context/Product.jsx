import React, { useEffect, useState } from 'react';
import { Mycontext } from './Mycontext';
import axios from 'axios';

const ProductProvider = ({ children }) => {
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
    const fetchData = async () => {
      try {
        const [allProducts, menProducts, shoesProducts, womenProducts, earphoneProducts, watchProducts, laptopProducts] = await Promise.all([
          axios.get("https://dummyjson.com/products"),
          axios.get("https://dummyjson.com/products/search?q=men"),
          axios.get("https://dummyjson.com/products/search?q=shoes"),
          axios.get("https://dummyjson.com/products/search?q=women"),
          axios.get("https://dummyjson.com/products/search?q=earphone"),
          axios.get("https://dummyjson.com/products/search?q=watch"),
          axios.get("https://dummyjson.com/products/search?q=laptop"),
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
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }

  return (
    <Mycontext.Provider value={data}>
      {children}
    </Mycontext.Provider>
  );
};

export default ProductProvider;
