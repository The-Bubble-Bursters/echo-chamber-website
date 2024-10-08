import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Button, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { auth } from '../firebase';

function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleRegister = () => {
    // Validate the form fields
    if (!name || !email || !password || !phone) {
      setErrorMessage("All fields are required.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Update profile with name and phone number
        updateProfile(user, {
          displayName: name,
          phoneNumber: phone,  // Note: phoneNumber will not be stored in Auth unless using phone verification, better store it in Firestore or Realtime Database.
        }).then(() => {
          console.log('User registered and profile updated:', user);
        }).catch((error) => {
          console.error("Error updating user profile:", error);
        });
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <div>
      <h1>Register</h1>
      <p>Please fill in the form to register:</p>

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
      <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
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
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {/* Submit Button */}
      <Button variant="contained" color="primary" onClick={handleRegister}>
        Register
      </Button>
    </div>
  );
}

export default RegisterScreen
