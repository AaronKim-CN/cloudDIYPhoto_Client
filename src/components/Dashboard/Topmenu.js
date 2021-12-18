import React,{ useState } from 'react';
import { Link } from 'react-router-dom';
import useToken from '../../useToken';

// MUI 5.0
import { IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';


export default function Topmenu() {
  
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { removeToken } = useToken();

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    removeToken();
    // Refresh the page
    window.location.reload();
  }

  return (
    <div>

      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" component={Link} to="/">
            <HomeIcon />
          </IconButton>

          <Typography variant="h6" sx={{ flexGrow: 1}}>
            MyPhotos
          </Typography>

          <IconButton edge="start" color="inherit" aria-label="menu" component={Link} to="/createalbum">
            <AddIcon />
          </IconButton>

          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircleIcon />
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
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>

              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
