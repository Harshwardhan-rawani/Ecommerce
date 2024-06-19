import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Productprovider from './context/Product.jsx'
import { Authprovider }  from './context/Auth.jsx';
import { Dataprovider } from './context/Datacontext.jsx';
import {Sliderprovider} from "./context/Slidercontext.jsx"
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

  <Productprovider>
    <Sliderprovider>
  <Authprovider>
    <Dataprovider>
  <App />
  <ToastContainer
position="top-right"
autoClose={1000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition: Bounce
/>
</Dataprovider>
</Authprovider>
</Sliderprovider>
  </Productprovider>
 
  </React.StrictMode>,
)
