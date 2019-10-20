import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { Typography } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import { loadLists } from "../../services/api";
import { LogoContainer } from "./styles";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const data = loadLists();

export default function Header() {
  const [name] = useState(data);
  const [anchorElement, setAnchorElement] = useState(null);
  const handleOpenMenu = e => setAnchorElement(e.target);
  const handleCloseMenu = () => setAnchorElement(null);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" styles={"display: flex"}>
        <Toolbar>
          <LogoContainer>
            <h1>Kardex</h1>
          </LogoContainer>
          <Typography> Olá {name[0].name}</Typography>
          <IconButton color="inherit" onClick={handleOpenMenu}>
            <AccountCircle />
          </IconButton>
          <Menu open={Boolean(anchorElement)} 
                onClose={handleCloseMenu}
                anchorEl={anchorElement}>
            <MenuItem>Convidar Membros</MenuItem>
            <MenuItem>Configuração</MenuItem>
            <MenuItem>Sair</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}
