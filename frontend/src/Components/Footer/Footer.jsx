import React from "react";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <BottomNavigation showLabels>
      <BottomNavigationAction
        component={Link}
        to="/matrix"
        label="Matice rizik"
        value="signal"
      />
    </BottomNavigation>
  );
}

export default Footer;
