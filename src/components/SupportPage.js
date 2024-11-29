import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button, Paper } from '@mui/material';

const SupportPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate email and message
    if (!email || !message) {
      setStatus('Please provide both email and message.');
      return;
    }

    // Send the email via Formspree
    const response = await fetch('https://formspree.io/f/xyzynqle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        message,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      setStatus('Your message has been sent successfully!');
      setEmail('');
      setMessage('');
    } else {
      setStatus('There was an error sending your message.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4} mb={4}>
        <Paper elevation={3}>
          <Box p={4}>
            <Typography variant="h4" gutterBottom>
              Support
            </Typography>
            <Typography variant="body1" gutterBottom>
              Have questions or need assistance? Send us a message, and we'll get back to you as soon as possible.
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                label="Your Email"
                type="email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextField
                label="Your Message"
                variant="outlined"
                fullWidth
                margin="normal"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                multiline
                rows={4}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Send Message
              </Button>
            </form>

            {status && (
              <Typography variant="body2" color={status.includes('success') ? 'green' : 'red'} mt={2}>
                {status}
              </Typography>
            )}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default SupportPage;
