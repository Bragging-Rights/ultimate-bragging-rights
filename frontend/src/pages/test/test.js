import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Link, Grid, LinearProgress, styled } from '@mui/material';

const Test = () => {
  const [hoveredName, setHoveredName] = useState(null);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [hoveredScore, setHoveredScore] = useState(null);

  const handleMouseEnter = (name, image, score) => {
    setHoveredName(name);
    setHoveredImage(image);
    setHoveredScore(score);
  };

  const handleMouseLeave = () => {
    setHoveredName(null);
    setHoveredImage(null);
    setHoveredScore(null);
  };

  const players = [
    {
      name: 'Connor McDavid',
      image: 'https://example.com/image1.jpg',
      score: '153',
    },
    {
      name: 'Leon Draisait',
      image: 'https://w0.peakpx.com/wallpaper/423/612/HD-wallpaper-wwe-roman-reigns-chest-music-thumbnail.jpg',
      score: '128',
    },
    {
      name: 'David Pastrnak',
      image: 'https://w0.peakpx.com/wallpaper/423/612/HD-wallpaper-wwe-roman-reigns-chest-music-thumbnail.jpg',
      score: '113',
    },
    {
      name: 'Nikita Kucherov',
      image: 'https://w0.peakpx.com/wallpaper/423/612/HD-wallpaper-wwe-roman-reigns-chest-music-thumbnail.jpg',
      score: '113',
    },
    {
      name: 'Nathan Mackinnon',
      image: 'https://w0.peakpx.com/wallpaper/423/612/HD-wallpaper-wwe-roman-reigns-chest-music-thumbnail.jpg',
      score: '111',
    },
    {
      name: 'Matthew Tkachuk',
      image: 'https://w0.peakpx.com/wallpaper/423/612/HD-wallpaper-wwe-roman-reigns-chest-music-thumbnail.jpg',
      score: '109',
    },
    {
      name: 'Jason Robertson',
      image: 'https://w0.peakpx.com/wallpaper/423/612/HD-wallpaper-wwe-roman-reigns-chest-music-thumbnail.jpg',
      score: '128',
    },
    {
      name: 'Mikko Rantanen',
      image: 'https://w0.peakpx.com/wallpaper/423/612/HD-wallpaper-wwe-roman-reigns-chest-music-thumbnail.jpg',
      score: '105',
    },
    {
      name: 'Ryan Nugent-Hopkins',
      image: 'https://w0.peakpx.com/wallpaper/423/612/HD-wallpaper-wwe-roman-reigns-chest-music-thumbnail.jpg',
      score: '104',
    },
    {
      name: 'Elias Pettersson',
      image: 'https://w0.peakpx.com/wallpaper/423/612/HD-wallpaper-wwe-roman-reigns-chest-music-thumbnail.jpg',
      score: '102',
    },
  ];

  const scores = [
    { heading: 'Perfect Scores', left: 542, right: 431 },
    { heading: 'Points', left: 8, right: 6 },
    { heading: 'Winning Percentage', left: 7, right: 5 },
    { heading: 'Ball Possession', left: 54, right: 46 },
    { heading: 'Red Card', left: 0, right: 0 },
    { heading: 'Yellow Card', left: 2, right: 5 },
    { heading: 'Offside', left: 4, right: 2 },
    { heading: 'Corners', left: 9, right: 4 }
  ];

  const CustomLinearProgress = styled(LinearProgress)(({ barcolor, emptycolor }) => ({
    height: 5,
    borderRadius: 5,
    backgroundColor: emptycolor,
    '& .MuiLinearProgress-bar': {
      borderRadius: 5,
      backgroundColor: barcolor,
    },
  }));

  return (
    <div>
      <Box sx={{ borderRadius: '8px', border: '1.5px solid #d59c07', maxWidth: '700px', backgroundColor: '#212121' }}>
        <Box sx={{ borderBottom: '1px solid #393939', padding: 2 }}>
          <Link
            href="#"
            underline="none"
            sx={{ color: 'white', marginRight: 2, '&:hover': { color: '#ddb74a', borderBottom: '2px solid #ddb74a', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' } }}
          >
            TP
          </Link>
          <Link
            href="#"
            underline="none"
            sx={{ color: 'white', marginRight: 2, '&:hover': { color: '#ddb74a', borderBottom: '2px solid #ddb74a', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' } }}
          >
            BR
          </Link>
          <Link
            href="#"
            underline="none"
            sx={{ color: 'white', marginRight: 2, '&:hover': { color: '#ddb74a', borderBottom: '2px solid #ddb74a', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' } }}
          >
            ASSISTS
          </Link>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', backgroundColor: '#212121', padding: '50px' }}>
          <div>
            {hoveredName && (
              <Box
                sx={{
                  marginTop: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: 2,
                  backgroundColor: '#212121',
                  borderRadius: 1,
                }}
              >
                {hoveredImage && (
                  <img
                    src={hoveredImage}
                    alt={hoveredName}
                    style={{
                      width: 100,
                      height: 100,
                      marginBottom: 10,
                      borderRadius: '50%',
                      border: '2px solid #ddd',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    }}
                  />
                )}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography variant="h6" sx={{ color: '#ddb74a', marginBottom: 0.5, boxShadow: '0 2px 4px rgba(0,0,0,0.1)', fontSize: '26px' }}>
                    {hoveredName}
                  </Typography>

                  <Typography
                    variant="h6"
                    sx={{
                      color: '#2cdd14',
                      fontWeight: 'bold',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      backgroundColor: '#393939',
                      border: '1px solid #4c4c4c',
                      borderRadius: 1,
                      width: '150px',
                      height: '150px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '30px',
                      marginTop: '30px',
                    }}
                  >
                    <span>Points</span>
                    <span>{hoveredScore}</span>
                  </Typography>
                </Box>
              </Box>
            )}
          </div>
          <div>
            <Card sx={{ borderRadius: '8px', border: '1.5px solid #4c4c4c', maxWidth: '300px', backgroundColor: '#2d2d2d' }}>
              <CardContent>
                <Grid container spacing={2}>
                  {players.map((player) => (
                    <Grid
                      key={player.name}
                      item xs={12}
                      onMouseEnter={() => handleMouseEnter(player.name, player.image, player.score)}
                      onMouseLeave={handleMouseLeave}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        '&:hover': {
                          '& .hover-effect': {
                            color: '#2cdd14',
                          },
                        },
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                      >
                        <Typography variant="body1" sx={{ color: 'white' }} className="hover-effect">{player.name}</Typography>
                      </div>
                      <Typography variant="body1" sx={{ color: 'white' }} className="hover-effect">{player.score}</Typography>
                    </Grid>
                  ))}
                  <Link
                    href="#"
                    underline="none"
                    sx={{ color: '#2cdd14', marginLeft: 'auto', '&:hover': { color: '#ddb74a', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' } }}
                  >
                    All Leader
                  </Link>
                </Grid>
              </CardContent>
            </Card>
          </div>
        </Box>
      </Box>

      <div>
        <Card sx={{ maxWidth: '500px', backgroundColor: '#1b1c21', marginTop: 5 }}>
          <Box sx={{ padding: 2 }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ color: 'white' }}>
              Season Scores
            </Typography>
            {scores.map((score, index) => (
              <Grid container key={index} spacing={2} alignItems="center" justifyContent="center">
                <Grid item xs={12}>
                  <Typography variant="h6" align="center" sx={{ color: 'white' }}>
                    {score.heading}
                  </Typography>
                </Grid>
                <Grid item xs={5} container alignItems="center" position="relative">
                  <CustomLinearProgress
                    variant="determinate"
                    value={score.left}
                    barcolor="#4caf50" // Green color
                    emptycolor="#3a3a3a" // Custom empty bar color
                    sx={{ width: '100%' }}
                  />
                  <Typography sx={{ position: 'absolute', top: -20, left: 15, color: 'white' }}>
                    {score.left}
                  </Typography>
                </Grid>
                <Grid item xs={5} container alignItems="center" position="relative">
                  <CustomLinearProgress
                    variant="determinate"
                    value={score.right}
                    barcolor="#ffeb3b" // Yellow color
                    emptycolor="#3a3a3a" // Custom empty bar color
                    sx={{ width: '100%' }}
                  />
                  <Typography sx={{ position: 'absolute', top: -20, right: 13, color: 'white' }}>
                    {score.right}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Box>
        </Card>
      </div>
      <div>
        <Card sx={{ maxWidth: '400px', backgroundColor: '#1b1c21', padding: 5, borderRadius: 5, marginTop: 5, marginBottom: 5 }}>
          <div>
            <h5 style={{ textAlign: 'center', color: 'white' }}>Help Us make Bragging Bights even Better</h5>
          </div>
          <div>
            <p style={{ textAlign: 'center', color: '#8a8a8d' }}>
              Please add your suggestions and feature<br />
              requests. We're listening to your<br />
              feedback and it helps to create our <br />
              ROADMAP.
            </p>
            <hr style={{ borderColor: '#8a8a8d', margin: '20px 0' }} />
          </div>

          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div style={{ flexBasis: '45%', textAlign: 'left', color: 'white', marginRight: '5%' }}>
              <span style={{ color: '#62c555' }}>GK</span> Diogo Costa
            </div>
            <div style={{ flexBasis: '45%', textAlign: 'right', color: 'white', marginLeft: '5%' }}>
              T.Courtois <span style={{ color: '#f5f613' }}>GK</span>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div style={{ flexBasis: '45%', textAlign: 'left', color: 'white', marginRight: '5%' }}>
              <span style={{ color: '#62c555' }}>DF</span> Danilo Pereira
            </div>
            <div style={{ flexBasis: '45%', textAlign: 'right', color: 'white', marginLeft: '5%' }}>
              Wout Faes <span style={{ color: '#f5f613' }}>DF</span>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div style={{ flexBasis: '45%', textAlign: 'left', color: 'white', marginRight: '5%' }}>
              <span style={{ color: '#62c555' }}>DF</span> Pepe
            </div>
            <div style={{ flexBasis: '45%', textAlign: 'right', color: 'white', marginLeft: '5%' }}>
              T.Meunier <span style={{ color: '#f5f613' }}>DF</span>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div style={{ flexBasis: '45%', textAlign: 'left', color: 'white', marginRight: '5%' }}>
              <span style={{ color: '#62c555' }}>DF</span> Ruben Dias
            </div>
            <div style={{ flexBasis: '45%', textAlign: 'right', color: 'white', marginLeft: '5%' }}>
              A.Theate <span style={{ color: '#f5f613' }}>DF</span>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div style={{ flexBasis: '45%', textAlign: 'left', color: 'white', marginRight: '5%' }}>
              <span style={{ color: '#62c555' }}>MF</span> Bernardo Silva
            </div>
            <div style={{ flexBasis: '45%', textAlign: 'right', color: 'white', marginLeft: '5%' }}>
              Kevin D.B <span style={{ color: '#f5f613' }}>MF</span>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div style={{ flexBasis: '45%', textAlign: 'left', color: 'white', marginRight: '5%' }}>
              <span style={{ color: '#62c555' }}>MF</span> Bruno .F
            </div>
            <div style={{ flexBasis: '45%', textAlign: 'right', color: 'white', marginLeft: '5%' }}>
              Axel Witsel <span style={{ color: '#f5f613' }}>MF</span>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div style={{ flexBasis: '45%', textAlign: 'left', color: 'white', marginRight: '5%' }}>
              <span style={{ color: '#62c555' }}>MF</span> Joao Pahlhinha
            </div>
            <div style={{ flexBasis: '45%', textAlign: 'right', color: 'white', marginLeft: '5%' }}>
              H. Vanaken <span style={{ color: '#f5f613' }}>MF</span>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div style={{ flexBasis: '45%', textAlign: 'left', color: 'white', marginRight: '5%' }}>
              <span style={{ color: '#62c555' }}>MF</span> Nuno Mendes
            </div>
            <div style={{ flexBasis: '45%', textAlign: 'right', color: 'white', marginLeft: '5%' }}>
              A. Onana <span style={{ color: '#f5f613' }}>MF</span>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div style={{ flexBasis: '45%', textAlign: 'left', color: 'white', marginRight: '5%' }}>
              <span style={{ color: '#62c555' }}>FW</span> C. Ronaldo
            </div>
            <div style={{ flexBasis: '45%', textAlign: 'right', color: 'white', marginLeft: '5%' }}>
              R. Lukaku <span style={{ color: '#f5f613' }}>FW</span>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div style={{ flexBasis: '45%', textAlign: 'left', color: 'white', marginRight: '5%' }}>
              <span style={{ color: '#62c555' }}>FW</span> Joao Felix
            </div>
            <div style={{ flexBasis: '45%', textAlign: 'right', color: 'white', marginLeft: '5%' }}>
              E. Hazdard <span style={{ color: '#f5f613' }}>FW</span>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div style={{ flexBasis: '45%', textAlign: 'left', color: 'white', marginRight: '5%' }}>
              <span style={{ color: '#62c555' }}>FQ</span> Ricardo Horta
            </div>
            <div style={{ flexBasis: '45%', textAlign: 'right', color: 'white', marginLeft: '5%' }}>
              D. Mertens <span style={{ color: '#f5f613' }}>FW</span>
            </div>
          </div>


        </Card>

      </div>

    </div>

  );
};

export default Test;
