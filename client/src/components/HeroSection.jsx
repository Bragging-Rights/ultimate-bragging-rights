import React from 'react'

const HeroSection = ({imgUrl}) => {
  return (
    <div className=' w-full'>
        <img src={imgUrl}  alt='img'/>
    </div>
  )
}

export default HeroSection