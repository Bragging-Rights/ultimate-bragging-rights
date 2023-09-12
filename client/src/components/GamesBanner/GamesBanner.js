import React from 'react'
import "./GamesBanner.css"
import GameCard from '../GameCard/GameCard';

const GamesBanner = () => {
 const date  = new Date();
 const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };

  const formattedDate = date.toLocaleDateString('en-US', options);

  return (
    <div className='games-banner mt-4'>
        <div className='d-flex justify-content-between align-items-center px-5  '
          style={{
            height:"58px",
            width:"65%"
          }}
        >
            <span>{ formattedDate}</span>
            <span>Upcoming Games</span>
   
        </div>
  
    </div>
  )
}

export default GamesBanner