import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const MainLayout = ({children}) => {

    console.log(children)
  return (
    <>
       <Navbar/>
    
   
    <div className='flex w-full'>
         
         <div className=' w-10/12  ml-5 mt-4'>
            
           <Outlet  />
           
         </div>
         <div className=' w-2/12'></div>
    </div>
    <Footer  />
    </>
  )
}

export default MainLayout