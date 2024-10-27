import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const VideoSection = () => {
  return (
    <Box sx={{ margin: '32px 0', textAlign: 'center' }}>
      <Container>
        <Typography variant="h4" gutterBottom sx={{ color: '#014397' }}>
          How It Works
        </Typography>
        <Box 
          component="iframe"
          src="https://www.youtube.com/embed/thQDkvOUY4E?si=9ixZxYLcmeo7BQRO"
          title="YouTube Video"
          allowFullScreen
          sx={{ 
            width: '100%', // Full width
            height: '480px', // Set height here
            border: 'none', 
            maxWidth: '800px', // Limit max width for better presentation
            margin: '0 auto', // Center the iframe
          }}
        />
      </Container>
    </Box>
  );
};

export default VideoSection;
