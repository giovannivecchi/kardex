import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { Typography } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import logo from "../../assets/img/logo.png";

import { loadLists } from "../../services/api";
import { LogoContainer } from "./styles";
import { useStyles } from "./styles";

const data = loadLists();

export default function Header(dados) {
  const [name] = useState(data);
  const [anchorElement, setAnchorElement] = useState(null);
  const handleOpenMenu = e => setAnchorElement(e.target);
  const handleCloseMenu = () => setAnchorElement(null);

  const idBoard = `${window.location.pathname.replace(
    "/board/",
    "/"
  )}`;

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        style={{ background: "linear-gradient(to right, #0062E6, #33AEFF)" }}
      >
        <Toolbar>
          <LogoContainer>
            <Link to={"/principal?id=1"}>
              <img src={logo} alt="Kardex" />
            </Link>
          </LogoContainer>
        
          <IconButton color={"inherit"} onClick={handleOpenMenu}>
            <AccountCircle />
          </IconButton>
          <Menu
            open={Boolean(anchorElement)}
            onClose={handleCloseMenu}
            anchorEl={anchorElement}
          >
            <MenuItem>Sair</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}
