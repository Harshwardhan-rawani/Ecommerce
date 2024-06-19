import axios from "axios";
import React,{createContext,useContext,useEffect,useState} from "react"
import { Authcontext } from "./Auth";
export const DataContext = createContext()

export const Dataprovider = ({children})=>{
   const [user,setUser]=useState(null)
    const {storetoken,token}=useContext(Authcontext)   
    useEffect(()=>{
        const fetchData = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_URL}/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                
                setUser(res.data);
            } catch (error) {
                console.log(error);
            }
        };
    
        if (token) {
            fetchData();
        }
        else{
            setUser("")
        }
    },[token])

    return <DataContext.Provider value={{user}}>
        {children}
    </DataContext.Provider>
}