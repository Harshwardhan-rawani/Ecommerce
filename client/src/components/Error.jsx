import React, { useContext } from 'react'
import { Mycontext } from "../context/Mycontext"

function Error() {
  const data = useContext(Mycontext)
  console.log(data)
  return (
    <div className='text-center font-bold text-2xl mt-10'>
    
      404 Not Found
      
    </div>
  )
}

export default Error
