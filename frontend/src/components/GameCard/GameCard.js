
import React from 'react';
import { useMediaQuery } from '@mui/material';
import MobileCard from './MobileCard';
import DesktopCard from './DesktopCard'; // Assuming you have a DesktopCard component

const GameCard = ({ gameData }) => {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <div>
      {isMobile ? (
        <MobileCard gameData={gameData} />
      ) : (
        <DesktopCard gameData={gameData} />
      )}
    </div>
  );
};

export default GameCard;
