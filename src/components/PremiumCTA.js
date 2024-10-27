import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';

const PremiumCTA = () => {
  return (
    <Box sx={{ margin: '32px 0', textAlign: 'center' }}>
      <Container>
        <Typography variant="h4" gutterBottom sx={{ color: '#014397' }}>
          Unlock Premium Features
        </Typography>
        <Typography variant="body1" sx={{ color: '#000' }}>
          Upgrade to premium and access exclusive features to enhance your experience!
        </Typography>
        <Button 
          variant="contained" 
          color="secondary" 
          href="/premium" 
          sx={{ marginTop: '16px' }} // Add some space above the button
        >
          Go Premium
        </Button>
      </Container>
    </Box>
  );
};

export default PremiumCTA;
