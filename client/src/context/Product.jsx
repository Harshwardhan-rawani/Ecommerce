import React, { useEffect, useState } from 'react';
import {  Mycontext } from './Mycontext';
import axios from 'axios';


const Productprovider = ({children})=>{
    const [data,setData]= useState([])
    const [mens,setmens] =useState([])
    const [shoes,setshoes] =useState([])
    const [women,setwomen] =useState([])
    const [watch,setwatch] =useState([])
    const [earphone,setearphone] =useState([])
    const [laptop,setlaptop] =useState([])
    useEffect(()=>{
        axios.get("https://dummyjson.com/products").then((res)=>{setData(res.data.products)})
        axios.get("https://dummyjson.com/products/search?q=men").then((res)=>{setmens(res.data.products)})
        axios.get("https://dummyjson.com/products/search?q=shoes").then((res)=>{setshoes(res.data.products)})
        axios.get("https://dummyjson.com/products/search?q=women").then((res)=>{setwomen(res.data.products)})
        axios.get("https://dummyjson.com/products/search?q=earphone").then((res)=>{setearphone(res.data.products)})
        axios.get("https://dummyjson.com/products/search?q=watch").then((res)=>{setwatch(res.data.products)})
        axios.get("https://dummyjson.com/products/search?q=laptop").then((res)=>{setlaptop(res.data.products)})

    },[])
 const objectdata ={ 
    mendata : mens,
    womendata : women,
    shoesdata : shoes,
    watchdata : watch, 
    earphonedata:earphone,
    laptopdata :laptop,
    alldata : data,
    ubkart: data.slice(0,9),
    bestselling : data.slice(10,19),
    topdeal : data.slice(20,29)
 }
 
    return (
        <Mycontext.Provider value = {objectdata}>
            {children}
        </Mycontext.Provider>
    );
};
export default Productprovider