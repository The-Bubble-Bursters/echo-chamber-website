import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from "firebase/auth";


export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showAuth, setShowAuth] = useState(true);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (location) => {
    setAnchorEl(null);
    if (location != null) {
      navigate(location)
    }
  };

  const logoutFirebase = () => {
    signOut(auth).then(() => {
      navigate('/')
    }).catch((error) => {
      // An error happened.
    });

  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setShowAuth(!user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: '#014397', padding: '8px 16px' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => navigate('/')}
            sx={{ mr: 2 }}
          >
            <img 
                src="./echo-chamber-high-resolution-logo.png" 
                alt="Logo" 
                height={50} 
                style={{ marginRight: '16px' }} 
            />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Echo Chamber
          </Typography>
          {showAuth ? null : (
            <IconButton
              size="large"
              aria-label="account of current user"
              onClick={() => navigate('/profile')}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          )}
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={() => handleClose(null)}
          >
            <MenuItem onClick={() => handleClose("/")}>Home</MenuItem>
            <MenuItem onClick={() => handleClose("/premium")}>Premium</MenuItem>
            {showAuth ? (
              <div>
                <MenuItem onClick={() => handleClose("/login")}>Login</MenuItem>
              </div>
            ) : (
              <MenuItem onClick={logoutFirebase}>Logout</MenuItem>
            )}
            <MenuItem onClick={() => handleClose("/support")}>Support</MenuItem>
            <MenuItem onClick={() => handleClose("/privacy")}>Privacy</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
