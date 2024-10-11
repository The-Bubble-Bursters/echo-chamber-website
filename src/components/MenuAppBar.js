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
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from "firebase/auth";
import SvgIcon from '@mui/material/SvgIcon';

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showAuth, setShowAuth] = useState(true);
  const navigate = useNavigate();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutFirebase = () => {
    signOut(auth).then(() => {
      navigate('/')
    }).catch((error) => {
      // An error happened.
    });

  };

  useEffect(() => {
    // async listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setShowAuth(false)
      }
      else {
        setShowAuth(true)
      }
    });

    // Cleanup subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => navigate('/')}
            sx={{ mr: 2 }}
          >
            <HomeIcon fontSize="large" />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Echo Chamber
          </Typography>
          
          {auth && (
            
            <div>

              {showAuth ? null
                 : 
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    onClick={() => navigate('/profile')}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
              }

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
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}><Link to="/">Home</Link></MenuItem>
                <MenuItem onClick={handleClose}><Link to="/products">Products</Link></MenuItem>
                {showAuth ? [
                  <MenuItem key="login" onClick={handleClose}><Link to="/login">Login</Link></MenuItem>,
                  <MenuItem key="register" onClick={handleClose}><Link to="/register">Register</Link></MenuItem>
                ] : [
                  <MenuItem key="logout" onClick={logoutFirebase}>Logout</MenuItem>
                ]}

              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
