import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import TextField from "@material-ui/core/TextField";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Popover from "@material-ui/core/Popover";

import logo from "../../assets/img/logo.png";
import Button from "react-bootstrap/Button";
import { Typography } from "@material-ui/core";
import axios from "axios";

import { LogoContainer } from "./styles";
import { useStyles } from "./styles";

export default function Header(dados) {
  const [anchorElement, setAnchorElement] = useState(null);
  const [usuarioLogado, setusuarioLogado] = useState(null);
  const [email, setEmail] = useState("");
  const handleOpenMenu = e => setAnchorElement(e.target);
  const handleCloseMenu = () => setAnchorElement(null);
  const referencia = useRef();
  const getUsuarioLogado = `http://localhost:5000/usuarioLogado`;
  useEffect(() => {
    axios(getUsuarioLogado).then(resp => {
    
      setusuarioLogado(resp.data);
    });
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [showModal, setShowModal] = useState(false);
  const [target, setTarget] = useState(null);

  const handleClickModal = event => {
    setShowModal(!showModal);
    setTarget(event.target);
  };

  

  const Convidar = () => {
    if (email === "") {
      alert("Informe o Email");
    } else {
      axios("http://localhost:5000/usuario").then(resp => {
        const exist = resp.data.filter(contato => contato.email === email);
        if (exist.length === 0) {
          alert("Email não cadastrado, Convide seu amigo para o Kardex :)");
        } else {
          const getBoard = `${window.location.pathname.replace("/board/", "")}`;
        

          const retorno = exist[0].board.filter(board => board === getBoard);
         
          exist[0].board.push(parseInt(getBoard))
        
          alert("Email vinculado ao Quadro !");

          axios['put'](`http://localhost:5000/usuario/${exist[0].id}`, exist[0]).then(resp => {
           
       
          
          });
          //console.log(exist.board.filter(board => board === getBoard))
        }
      });
    }
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        <Typography style={{ maginTop: "5%" }}>
          Informe o E-mail do membro que gostaria de Convidar ao Quadro
        </Typography>
        <Row
          style={{
            marginLeft: "2%",
            marginTop: "5%",
            marginRight: "5%",
            marginBottom: "5%"
          }}
        >
          <TextField
            id="email"
            label="Email"
            type="text"
            fullWidth
            name="email"
            value={email}
            InputLabelProps={{
              shrink: true
            }}
            onChange={e => setEmail(e.target.value)}
          />
        </Row>
        <Row></Row>
        <Row style={{ marginLeft: "82%" }}>
          <Button variant="primary" onClick={() => Convidar()}>
            Salvar
          </Button>
        </Row>
      </Popover>

      <AppBar
        position="fixed"
        style={{ background: "linear-gradient(to right, #0062E6, #33AEFF)" }}
      >
        <Toolbar>
          <LogoContainer>
            <Link to={`/principal?id=${usuarioLogado && usuarioLogado.id}`}>
              <img src={logo} alt="Kardex" />
            </Link>
          </LogoContainer>
          <Typography>
            {" "}
            Olá {usuarioLogado && usuarioLogado.username}
          </Typography>

          <IconButton color={"inherit"} onClick={handleOpenMenu}>
            <AccountCircle />
          </IconButton>

          <Menu
            open={Boolean(anchorElement)}
            onClose={handleCloseMenu}
            anchorEl={anchorElement}
            ref={referencia}
          >
            <MenuItem aria-describedby={id} onClick={handleClick}>
              Convidar Membro
            </MenuItem>
            <MenuItem>Sair</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}
