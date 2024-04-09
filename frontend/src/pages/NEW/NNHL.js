
import React, { useState, useEffect } from 'react';

export default function NNHL() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [sortedData, setSortedData] = useState([]);
  const [sortField, setSortField] = useState('TP'); 
  const [sortAscending, setSortAscending] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const mockData = [
   
{
  visitor: 'Team A',
  home: 12,
  final: 2,
  prediction: 232,
  time: 123,
  co: 23,
  prov: 23,
  state: 12,
  city: 34,
  player: 23,
  R: 10,
  TP: 20,
  Br: 1,
  Fu: 7,
  odds: 25,
  accuracy: 75,
  shutout: 23,
  ending: 42,
  SW2: 23,
  REG: 12,
  E1: 423,
  SO: 234,
  N1:342,
  N2:43,
  N3:234,
  
  },
    {
      visitor: 'Team B',
      home: 17,
      final: 1,
      prediction: 354,
      time: 645,
      co: 31,
      prov: 47,
      state: 18,
      city: 52,
      player: 29,
      R: 14,
      TP: 28,
      Br: 2,
      Fu: 9,
      odds: 33,
      accuracy: 67,
      shutout: 14,
      ending: 56,
      SW2: 31,
      REG: 18,
      E1: 539,
      SO: 397,
      N1:342,
      N2:43,
      N3:234,
      },
      {
        visitor: 'Team C',
        home: 15,
        final: 5,
        prediction: 209,
        time: 156,
        co: 35,
        prov: 18,
        state: 7,
        city: 41,
        player: 19,
        R: 11,
        TP: 22,
        Br: 4,
        Fu: 6,
        odds: 29,
        accuracy: 73,
        shutout: 21,
        ending: 49,
        SW2: 25,
        REG: 14,
        E1: 412,
        SO: 185,
        N1:342,
        N2:43,
        N3:234,
        },
  ];

  useEffect(() => {
    sortData(sortField);
  }, [sortField, sortAscending]);

  const sortData = (field) => {
    const sorted = [...mockData].sort((a, b) => {
      if (sortAscending) {
        return parseFloat(a[field]) - parseFloat(b[field]);
      } else {
        return parseFloat(b[field]) - parseFloat(a[field]);
      }
    });
    setSortedData(sorted);
  };

  const toggleSortOrder = (field) => {
  
    if (field === sortField) {
      setSortAscending(!sortAscending);
    } else {
      setSortAscending(true);
    }
    setSortField(field);
  };

  return (
    <div>
      <div style={{ backgroundColor: 'rgb(179, 179, 0)', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: '10px' }}>
        <span>{formattedDate}</span>
        <span style={{ textAlign: 'center', color: 'black', flexGrow: 1 }}>Game Breakdowns</span>
      </div>
      <button  style={{ backgroundColor: '#1B1C21',color:"white",padding:"1rem",border:"none" }}>League</button>
      <button  style={{ backgroundColor: '#1B1C21',color:"white",padding:"1rem",border:"none" }}>Home</button>
      <button style={{backgroundColor:"#1B1C21",color:"white",padding:"1rem",border:"none" }}>Away</button>
      <div style={{ color: 'white' }}>
        <div className="grid-item">
          <table className="custom-table">
            <thead>
              <tr>
               
                <th onClick={() => toggleSortOrder('R')} style={{ cursor: 'pointer' }}>VISITOR</th>
                <th onClick={() => toggleSortOrder('home')} style={{ cursor: 'pointer' }}>HOME</th>
                <th onClick={() => toggleSortOrder('final')} style={{ cursor: 'pointer' }}>FINAL</th>
                <th onClick={() => toggleSortOrder('prediction')} style={{ cursor: 'pointer' }}>PREDICTION</th>
                <th onClick={() => toggleSortOrder('time')} style={{ cursor: 'pointer' }}>TIMESTAMP</th>
                <th onClick={() => toggleSortOrder('co')} style={{ cursor: 'pointer' }}>CO</th>
                <th onClick={() => toggleSortOrder('prov')} style={{ cursor: 'pointer' }}>PROV/CITY</th>
                <th onClick={() => toggleSortOrder('state')} style={{ cursor: 'pointer' }}>RANK</th>
                <th onClick={() => toggleSortOrder('city')} style={{ cursor: 'pointer' }}>TP</th>
                <th onClick={() => toggleSortOrder('player')} style={{ cursor: 'pointer' }}>UBR</th>
                <th onClick={() => toggleSortOrder('TP')} style={{ cursor: 'pointer' }}>ML</th>
                <th onClick={() => toggleSortOrder('Br')} style={{ cursor: 'pointer' }}>F</th>
                <th onClick={() => toggleSortOrder('Fu')} style={{ cursor: 'pointer' }}>U</th>
                <th onClick={() => toggleSortOrder('odds')} style={{ cursor: 'pointer' }}>SPRD</th>
                <th onClick={() => toggleSortOrder('accuracy')} style={{ cursor: 'pointer' }}>O/U</th>
                <th onClick={() => toggleSortOrder('shutout')} style={{ cursor: 'pointer' }}>1S</th> 
                <th onClick={() => toggleSortOrder('ending')} style={{ cursor: 'pointer' }}>1SO</th>
                <th onClick={() => toggleSortOrder('SW2')} style={{ cursor: 'pointer' }}>REG</th>
                <th onClick={() => toggleSortOrder('REG')} style={{ cursor: 'pointer' }}>OT</th>
                <th onClick={() => toggleSortOrder('E1')} style={{ cursor: 'pointer' }}>S/0</th>
               
                
              </tr>
            </thead>
            <tbody>
              {sortedData.map((data, index) => (
                <tr key={index}>
                
                  <td>{data.home}</td>
                  <td>{data.final}</td>
                  <td>{data.prediction}</td>
                  <td>{data.time}</td>
                  <td>{data.co}</td>
                  <td>{data.prov}</td>
                  <td>{data.state}</td>
                  <td>{data.city}</td>
                  <td>{data.player}</td>
                  <td>{data.R}</td>
                  <td>{data.TP}</td>
                  <td>{data.Br}</td>
                  <td>{data.Fu}</td>
                  <td>{data.odds}</td>
                  <td>{data.accuracy}</td>
                  <td>{data.shutout}</td>
                  <td>{data.ending}</td>
                  <td>{data.SW2}</td>
                  <td>{data.REG}</td>
                  <td>{data.E1}</td>
                  
                
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


