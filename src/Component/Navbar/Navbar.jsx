import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";
import styles from "./navbar.module.css";
import { Box } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';


const { navbar } = styles;

export default function Navbar() {
  return (
    <AppBar position="static" className={navbar}>
      <Toolbar>
        <Link
          component = {RouterLink}
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src="https://movies-app-main-hfj4a9t01-ayahezzeddine.vercel.app/static/media/reactMovie_logo.e1d936f2.png"
            alt="Logo"
            sx={{
              width: "300px", 
              height: "auto", 
              padding: '35px 0px',
            }}
          />
          <Box />

          
        </Link>
      </Toolbar>
    </AppBar>
  );
}
