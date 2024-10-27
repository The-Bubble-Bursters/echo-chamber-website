import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import Grid2 from '@mui/material/Grid2'; // Use Grid2 for layout
import Paper from '@mui/material/Paper';

const FeatureOverview = () => {
  const features = [
    {
      title: 'Echo Chamber Status',
      description:
        'Get real-time insights into the echo chamber status of the content you’re viewing. Understand its leanings and the percentage alignment with specific viewpoints.',
      image: '/conflict.png', // Update with the actual image path
    },
    {
      title: 'Unlock Advanced Insights',
      description:
        'Gain access to in-depth analyses, including reasoning and supporting data behind the echo chamber status.',
      image: '/data.jpg', // Update with the actual image path
    },
    {
      title: 'Explore More with Premium',
      description:
        'Subscribe to premium for tailored content suggestions that help you break free from your echo chamber and discover new perspectives.',
      image: '/diverse-info.png', // Update with the actual image path
    },
  ];

  return (
    <Box sx={{ margin: '32px 0' }}>
      <Container>
        <Typography variant="h4" gutterBottom align="center" sx={{ color: '#014397' }}>
          Feature Overview
        </Typography>
        <Grid2 container spacing={3} justifyContent="center">
          {features.map((feature, index) => (
            <Grid2 item xs={12} sm={6} md={4} key={index}>
              <Paper 
                elevation={3} 
                sx={{ 
                  padding: '16px', 
                  textAlign: 'center', 
                  width: '250px', // Fixed width for consistency
                  height: '450px', // Fixed height for consistency
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between', // Space between title, description, and image
                  alignItems: 'center', 
                  margin: '0 auto' // Center the paper within the grid item
                }}
              >
                <Typography variant="h5" sx={{ marginBottom: '8px', color: '#014397' }}>
                  {feature.title}
                </Typography>
                <Typography variant="body1" sx={{ color: '#000' }}>
                  {feature.description}
                </Typography>
                <img src={feature.image} alt={feature.title} style={{ width: '100%', height: 'auto', maxHeight: '500px' }} />
              </Paper>
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </Box>
  );
};

export default FeatureOverview;
