import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Button, TextField, Typography, Container, Paper } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleLogin = () => {
    // Validate the form fields
    if (!email || !password) {
      setErrorMessage("All fields are required.");
      return;
    }
    
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Signed in 
        navigate('/profile');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`error code=${errorCode} and ${errorMessage}`);
        setErrorMessage(errorMessage); // Set error message to display
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/profile');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Sign In
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Please sign-in:
        </Typography>

        {/* Email Input */}
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          type="email"
        />

        {/* Password Input */}
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

        {/* Error Message */}
        {errorMessage && (
          <Typography variant="body2" color="error" align="center" sx={{ mt: 2 }}>
            {errorMessage}
          </Typography>
        )}

        {/* Submit Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
          onClick={handleLogin}
        >
          Login
        </Button>
        {/* Register Button */}
      <div style={{ marginTop: '1rem' }}>
        <p>Don't have an account? 
          <Button 
            variant="outlined" 
            color="secondary" 
            onClick={() => navigate('/register')} 
            style={{ marginLeft: '0.5rem' }}
          >
            Register
          </Button>
        </p>
      </div>
      </Paper>
    </Container>
  );
}

export default SignInScreen;
