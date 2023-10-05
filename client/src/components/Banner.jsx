import React from 'react'

const Banner = ({date,label}) => {
  return (
    <div className=' h-14 w-full flex items-center my-5'
      style={{
        background: "linear-gradient(180deg, #BE8200 0%, #FEF098 47.4%, #EFD261 100%)"
      }}
    >
     <div className=' w-2/3 flex justify-between'>
           <div className=' ml-8 text-lg font-bold'>{date}</div>
           <div className=' ml-8 text-lg font-bold'>{label}</div>
     </div>
    </div>
  )
}

export default Banner