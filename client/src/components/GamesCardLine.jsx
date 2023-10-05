import React from 'react'

const GamesCardLine = ({width}) => {
  return (
    <div className={`${width} h-2 rounded-[1px] `
   }
   style={{

    background: "linear-gradient(185deg, #45423A 15.54%, #202126 114.57%)",
     boxShadow: "1px 1px 2px 0px #000"
   }}
   ></div>
  )
}

export default GamesCardLine