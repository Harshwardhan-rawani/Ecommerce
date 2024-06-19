
import axios from "axios";
import React,{createContext,useContext,useEffect,useState} from "react"

export const SliderContext = createContext()

export const Sliderprovider = ({children})=>{
    const [data, setData] = useState([]);
    const productIds = [78, 101, 106, 66, 155, 93,56];
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const requests = productIds.map((id) =>
            axios.get(`https://dummyjson.com/products/${id}`)
          );
          const responses = await Promise.all(requests);
          const products = responses.map((res) => res.data);
          setData(products);
        } catch (error) {
          console.error("Error fetching product data:", error);
        }
      };
  
      fetchData();
    }, []);
 
    return <SliderContext.Provider value={{data}}>
        {children}
    </SliderContext.Provider>

}