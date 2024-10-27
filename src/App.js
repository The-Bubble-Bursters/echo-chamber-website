import './App.css';
import MenuAppBar from './components/MenuAppBar'
import { Box } from '@mui/material';
import LandingPage from './components/LandingPage'
import Profile from './components/Profile'
import SignInScreen from './components/SignInScreen'
import Products from './components/Products'
import RegisterScreen from './components/RegisterScreen'
import PrivacyPolicy from './components/PrivacyPolicy'
import Footer from './components/Footer'
import NotFound from './components/NotFound';
import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#014397',
    },
    secondary: {
      main: '#f2a1c4',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we were redirected from the 404.html page
    const searchParams = new URLSearchParams(window.location.search);
    const redirectPath = searchParams.get("p");
    if (redirectPath) {
      navigate(redirectPath);
    }
  }, [navigate]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh', // Ensures the container takes at least the full viewport height
      }}
    >
      <MenuAppBar />
      <Box
        sx={{
          flex: '1 0 auto', // This will grow to take available space
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start', // Aligns content at the top
          overflowY: 'hidden', // Prevents vertical scrolling
        }}
      >
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<SignInScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/premium" element={<Products />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
      <Footer sx={{ mt: 'auto' }} /> {/* Keep the footer at the bottom */}
    </Box>
    </ThemeProvider>
  );
  
}

export default App;
