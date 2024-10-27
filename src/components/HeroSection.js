import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const HeroSection = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',  // Center horizontally
        justifyContent: 'center', // Center vertically
        textAlign: 'center', // Center text
        minHeight: '40vh', // Minimum height for the section
        bgcolor: '#f2a1c4', // Optional background color
        p: 4, // Padding
      }}
    >
      <Typography variant="h2" component="h1" sx={{ color: '#014397', marginBottom: '16px' }} gutterBottom>
        Welcome to Echo Chamber
      </Typography>
      <Typography variant="body1" sx={{ color: '#014397', marginBottom: '16px' }} gutterBottom>
        Discover diverse perspectives and break free from echo chambers.
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => window.open("https://chromewebstore.google.com/detail/echo-chamber/ihleleinncbgegegpiegibkbfbggncah?authuser=1&hl=en", "_blank")}
      >
        Download the Extension
      </Button>
    </Box>
  );
};

export default HeroSection;