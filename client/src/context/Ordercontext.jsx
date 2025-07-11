
import React,{createContext,useEffect,useState} from "react"

export const Ordercontext = createContext();

export const Orderprovider = ({children})=>{
  
   const [orderItem,setorderItems] = useState([])
    const orderitemsfun = (item)=>{
        setorderItems(item);
    }
    return (
        <Ordercontext.Provider  value = {{orderitemsfun,orderItem}}>
            {children}
        </Ordercontext.Provider>
    );
}
