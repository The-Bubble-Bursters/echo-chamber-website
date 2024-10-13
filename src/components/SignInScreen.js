// Import FirebaseAuth and firebase.
import { useState, useEffect }  from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Button, TextField } from '@mui/material';
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
    if ( !email || !password ) {
      setErrorMessage("All fields are required.");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      // const user = userCredential.user;
      navigate('/profile');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`error code=${errorCode} and ${errorMessage}`)
    });
  }

  useEffect(() => {
    // async listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If user is signed in, navigate to profile
        navigate('/profile');
      }
    });

    // Cleanup subscription when the component unmounts
    return () => unsubscribe();
  }, [navigate]);

  return (
    <div>
      <h1>My App</h1>
      <p>Please sign-in:</p>

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
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
    </div>
  );
}

export default SignInScreen
