import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Button, TextField, Typography, Container, Paper } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { auth } from '../firebase';

function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleRegister = () => {
    if (!name || !email || !password || !phone) {
      setErrorMessage("All fields are required.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name,
          phoneNumber: phone, 
        }).then(() => {
          navigate('/profile');
        }).catch((error) => {
          console.error("Error updating user profile:", error);
        });
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Register
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Please fill in the form to register:
        </Typography>

        {/* Name Input */}
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />

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

        {/* Phone Input */}
        <TextField
          label="Phone Number"
          variant="outlined"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
          margin="normal"
          type="tel"
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
          onClick={handleRegister}
        >
          Register
        </Button>
        {/* Register Button */}
        <div style={{ marginTop: '1rem' }}>
          <p>Already have an account?
            <Button 
              variant="outlined" 
              color="secondary" 
              onClick={() => navigate('/login')} 
              style={{ marginLeft: '0.5rem' }}
            >
              Login
            </Button>
          </p>
        </div>
      </Paper>
    </Container>
  );
}

export default RegisterScreen;
