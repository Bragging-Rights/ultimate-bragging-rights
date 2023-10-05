import React from 'react'
import logo from "../assets/logo.png"
import {FaFacebookF, FaInstagram, FaTwitter} from "react-icons/fa"
const Footer = () => {
  return (
    <div className=' bg-[#1B1C21] py-11 flex items-center flex-col'>
   
      <img src={logo}  alt='logo'  
        width={72}
        height={55}
      />
      <p className=' mt-3 text-[#FFF] text-xs opacity-50 font-normal'>
      ©2020 Sports Fans Challenges Inc . A Global Sports Network with a Conscience. 
      </p>
      <p className='text-[#FFF] text-xs opacity-50 font-normal'>
      All Rights Reserved. Terms of Use / New Privacy Policy </p>
      <p className='text-[#FFF] text-xs opacity-50 font-normal'>
      We never sell your information! </p>
        
      <p className='text-[#FFF] text-xs opacity-50 font-normal mt-5'>
      DISCLAIMER: This site is 100% for entertainment purposes only and does not involve real money betting. Play responsibly. </p>
      <p className='text-[#FFF] text-xs opacity-50 font-normal'>
      If you or someone you know has a gambling problem, seek confidential support: USA 1-800 GAMBLER, Canada 1-800 463-1554. </p>

      <ul className=' my-4 flex gap-20'>
        <li className=' text-white cursor-pointer'>Campaigns</li>
        <li className=' text-white cursor-pointer'>Email Marketing</li>
        <li className=' text-white cursor-pointer'>Branding</li>
        <li className=' text-white cursor-pointer'>Offline</li>
        <li className=' text-white cursor-pointer'>Contact</li>
        <li className=' text-white cursor-pointer'>FAQs</li>
        
      </ul>
      <div className=' flex gap-5 mt-5'>
    
      <FaFacebookF  size={24} color='white'/>
      <FaTwitter  size={24} color='white'/>
      <FaInstagram  size={24} color='white'/>

      </div>
    </div>
    
  )
}

export default Footer