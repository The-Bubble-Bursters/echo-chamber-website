import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md">
      <Box mt={4} mb={4}>
        <Paper elevation={3}>
          <Box p={4}>
            <Typography variant="h4" gutterBottom>
              Privacy Policy
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Effective Date:</strong> October 24, 2024
            </Typography>
            <Typography variant="body1" gutterBottom>
              This Privacy Policy describes how your information is collected, used, and shared when you use our Chrome extension ("the Extension").
            </Typography>

            <Typography variant="h6" gutterBottom>
              Information We Collect
            </Typography>
            <Typography variant="body1" gutterBottom>
              We collect the following information when you use the Extension:
            </Typography>
            <ul>
              <li>
                <Typography variant="body1" gutterBottom>
                  <strong>Login/Registration Information:</strong> We collect your email address and password when you register or log in to use the Extension.
                </Typography>
              </li>
              <li>
                <Typography variant="body1" gutterBottom>
                  <strong>Premium User Status:</strong> We keep track of your subscription status to provide access to premium features.
                </Typography>
              </li>
            </ul>

            <Typography variant="h6" gutterBottom>
              How We Use Your Information
            </Typography>
            <Typography variant="body1" gutterBottom>
              We use your information solely for the following purposes:
            </Typography>
            <ul>
              <li>
                <Typography variant="body1" gutterBottom>
                  To manage your login and registration.
                </Typography>
              </li>
              <li>
                <Typography variant="body1" gutterBottom>
                  To track and verify your premium subscription status.
                </Typography>
              </li>
            </ul>

            <Typography variant="h6" gutterBottom>
              Sharing of Information
            </Typography>
            <Typography variant="body1" gutterBottom>
              We do not sell, trade, or otherwise transfer your information to third parties at this time. We may share information to comply with legal obligations or to protect our rights.
            </Typography>

            <Typography variant="h6" gutterBottom>
              Data Security
            </Typography>
            <Typography variant="body1" gutterBottom>
              We employ security measures to safeguard your information. While we strive to protect your data, no method of transmission over the internet is completely secure.
            </Typography>

            <Typography variant="h6" gutterBottom>
              Changes to This Policy
            </Typography>
            <Typography variant="body1" gutterBottom>
              We may update this Privacy Policy from time to time. Any changes will be posted within the Extension, and your continued use of the Extension after such changes will constitute your acknowledgment and acceptance of the changes.
            </Typography>

            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body1" gutterBottom>
              If you have any questions or concerns about this Privacy Policy, please contact us at contact@getechochamber.com.
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default PrivacyPolicy;
