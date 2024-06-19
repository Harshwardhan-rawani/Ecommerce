
import './App.css'
import Top from './components/Top'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Login from './pages/Login';
import Admin from './components/Admin/Admin';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import AdminTop from "./components/Admin/AdminTop"
import MenuAdmin from './components/Admin/MenuAdmin'
import Homeitem from './components/Admin/Homeitem';
import Error from "./components/Error"
import Feature from './pages/Feature';
import Cart from './pages/Cart';
import Product from './pages/Product';
import { Authcontext } from './context/Auth';
import { useContext } from 'react';
import Likedlist from './pages/Likedlist';
function App() {
  const {storetoken,token,deletetoken}=useContext(Authcontext)

  return (
    <>
  
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route  index element={<><Top/><Home/></>} />
          <Route   path="/login" element= {<><Top/><Login/></>} />
          <Route   path="*" element= {<><Error/></>} />
          <Route   path="/admin" element= {<><Admin/></>} />
          <Route   path="/signup" element= {<><Top/><Signup/></>} />
          <Route   path="/profile" element= {<><Top/><Profile /></>} />
          <Route   path="/admin/homeitems" element= {<><AdminTop/><MenuAdmin/><Homeitem/></>} />
          <Route   path="/feature/:id" element= {<><Top/><Feature/></>} />
          <Route   path="/cart" element= {<><Top/><Cart/></>} />
          <Route   path="/wishlist" element= {<><Top/><Likedlist/></>} />
          <Route   path="/product/:id" element= {<><Top/><Product/></>} />


        </Route>
      </Routes>
    </BrowserRouter>

    
   
    </>
  )
}

export default App
