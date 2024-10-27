import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#014397', padding: '16px 0' }}>
      <Container>
        <Typography variant="body2" align="center" color="white">
          &copy; {new Date().getFullYear()} Echo Chamber. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
