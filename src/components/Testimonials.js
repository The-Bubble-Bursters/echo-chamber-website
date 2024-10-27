import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

const testimonials = [
  {
    quote: "This extension changed how I view information!",
    author: "User A",
  },
  {
    quote: "A must-have tool for anyone online.",
    author: "User B",
  },
];

const Testimonials = () => {
  return (

    <Box sx={{ margin: '16px 0' }}>
        <Container>
        <Typography variant="h4" gutterBottom>
            What Our Users Say
        </Typography>
        {testimonials.map((testimonial, index) => (
            <Paper key={index} elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
            <Typography variant="body1">"{testimonial.quote}"</Typography>
            <Typography variant="caption" style={{ fontStyle: 'italic', }}>
                - {testimonial.author}
            </Typography>
            </Paper>
        ))}
        </Container>
    </Box>
  );
};

export default Testimonials;
