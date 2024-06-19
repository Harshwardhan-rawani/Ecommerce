
import React,{createContext,useEffect,useState} from "react"

export const Authcontext = createContext();

export const Authprovider = ({children})=>{

    const [token, setToken] = useState(localStorage.getItem('token'));
 
    const storetoken = (newToken)=>{
        setToken(newToken)
   return localStorage.setItem('token', newToken);
    }
    const deletetoken = ()=>{
        setToken("")
        localStorage.removeItem('token')
    }

    return (
        <Authcontext.Provider  value = {{storetoken,token,deletetoken}}>
            {children}
        </Authcontext.Provider>
    );
}
