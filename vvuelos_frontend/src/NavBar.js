import React from 'react';
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
      <div>
      <nav className="navbar navbar-expand navbar-dark bg-primary">
        <a href="/" className="navbar-brand">
          vVuelos
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/usuario"} className="nav-link">
              Usuario
            </Link>
          </li>
          <li class="nav-item">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Admin
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <div>
              <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                Open Menu
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
              </div>
              <Link to={"/roles"} className="dropdown-item">
                Roles
              </Link>
            </div>
          </li>
        </div>
      </nav>


    
      

    </div>
  );
}
