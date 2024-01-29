import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Header = () => {
  return (
          
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div" >
            City-Farm
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Header;
