import styled, { css } from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import { darken } from "polished";

const contorno = `outline: none !important; border:1px solid gray ;`;

export const Container = styled.div`
  position: relative;
  background: #fff;
  border-radius: 20px;
  margin-bottom: 10px;
  padding: 15px;
  box-shadow: 0 9px 7px 3px rgba(192, 208, 230, 1);
  border-top: 20px solid rgba(230, 236, 245, 0.4);
  cursor: grab;
  border: 10px solid rgba(230, 236, 245, 0.2);
  :hover {
    background: ${darken(0.03, "#FFFDFF")};
  }

  header {
    position: absolute;        
    margin-top: -2vh;            
    display: flex;
    align-items: flex-start;
  }

  p {
    font-weight: 500;
    line-height: 20px;
    margin-top: 1vh;
  }

  img {
    width: 24px;
    height: 24px;
    border-radius: 2px;
    margin-top: 5px;
  }

  ${props =>
    props.isDragging &&
    css`
      border: 2px groove rgba(0, 0, 0, 0.2);
      padding-top: 31px;
      border-radius: 3;
      background: transparent;
      box-shadow: none;
      cursor: grabbing;

      p,
      img,
      header {
        opacity: 0;
      }
    `}
  ${props =>
    props.isVisible === false &&
    css`
      opacity: 0;
      height: 0px;
      cursor: default;
      header {
        height: 0px;
      }
    `}
`;

export const Label = styled.span`
  width: 20px;
  height: 10px;
  border-radius: 2px;  
  margin-bottom: 4vh;  
  background: ${props => props.color};
`;

export const LabelCard = styled.div`  
    box-sizing: border-box;
    display: block;
    float: left;
    font-weight: 600;
    height: 32px;
    line-height: 32px;  
    margin: 0 4px 4px 0;
    min-width: 40px;
    padding: 0 12px;
    width: auto;
  background: ${props => props.color};
`;

export const Tag = styled.div`  
    box-sizing: border-box;
    display: block;
    float: left;
    font-weight: 600;
    width: 100px;
    height: 21px;
    color: white;
    border-radius: 3px;
    margin-left: 2vw;
    margin-right: 2vw;
    box-shadow: 0 9px 7px 3px rgba(192, 208, 230, 0.2);
    margin-bottom: 1vh;
    text-align: center;
  background: ${props => props.color};
`;


export const Header = styled.header`
   display: flex;
   align-items: flex-start;
   margin: 0 0 0 0 ;
`


export const LabelUsuario = styled.span`
  font-size: 14px;
  font-weight: 600;
  border-radius: 2px;
  display: inline-block;
  margin-top: 1.5vh;
  margin-left: -2px;
  color: blue;
`;


export const LabelComentario = styled.div`
  @import url("https://fonts.googleapis.com/css?family=Poppins&display=swap");
  font-size: 12px;
  font-weight: 600;
  border-radius: 2px;
  font-family: "Poppins", sans-serif;
  display: inline-block;
  margin-top: 1.5vh;
  margin-left: 0px;
  color: black;
`;

export const Titulo = styled.input`
  background: transparent;
  border-radius: 3px;
  box-shadow: none;
  font-size: 20px;
  font-weight: 600;
  border-style: none;
  width: 38ch;

  :focus {
    ${contorno}
  }

  line-height: 24px;
  margin: -4px -8px;
  min-height: 24px;
  padding: 4px 8px;
  resize: none;
  overflow: hidden;
  overflow-wrap: break-word;
  height: 33px;
  
`;

export const Subtitle = styled.label`
  margin-block-start: 1em;
  margin-block-end: 1em;
  box-shadow: none;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-size: 16px;
  font-weight: 600;
  position: relative;
  color: #000;
  line-height: 20px;
  width: auto;
  margin: 0;
  min-height: 18px;
  min-width: 40px;
  margin-bottom: 2px;
  -webkit-font-smoothing: antialiased !important;
`;

export const Descricao = styled.textarea`
  background: transparent;
  border-radius: 3px;
  margin-left: 10px;
  box-shadow: none;
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 1vh;
  border-color: rgba(9, 30, 66, 0.33);
  :focus {
    ${contorno}
  }
  line-height: 24px;
  min-height: 108px;
  padding: 4px 8px;
  resize: none;
  overflow: hidden;
  overflow-wrap: break-word;
  height: 150px;
  width: 80%;
  text-rendering: auto;
  cursor: text;
`;

export const Img = styled.img`
  height:36px;
  width:36px;
  margin-left: 1px;
`;


export const ImgComment = styled.img`
  height:36px;
  width:36px;
  margin-left: 2px;
  margin-bottom: 3px;
  border-radius: 50%;
`;

export const Comentario = styled.textarea`
  background: transparent;
  border-radius: 3px;
  margin-left: -1vw;
  display: flex;  
  align-items: left;
  box-shadow: none;
  font-size: 14px;
  font-weight: 400;
  border-color: rgba(9, 30, 66, 0.33);
  :focus {
    ${contorno}
  }
  min-height: 80px;
  resize: none;
  overflow: hidden;
  overflow-wrap: break-word;
  height: 80px;
  width: 83%;
  text-rendering: auto;
  cursor: text;
`;

export const Line = styled.div`
    border-top: 1px solid rgba(9, 30, 66, 0.33);
    width: 81%;
    height: 4%;
    margin-left: 1%;
    margin-top: 1%;
    margin-bottom: 3%;
`;

export const QuadroComentario = styled.form`
  
    width: 81%;
    margin-left: 1%;
    margin-top: 1%;
    margin-bottom: 3%;
`;


export const TextoComentario = styled.div`
    border: 1px solid rgba(9, 30, 66, 0.33);
    margin-bottom: 10px;
    margin-top: 5px;
    background-color: white;
    border-radius: 3px;
    box-shadow: 0 3px 7px 3px rgba(192, 208, 230, 1);
`;



export const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 400,
    height: 500,
    backgroundColor: "#e0e0e0",
    border: "1px solid #D3D3D3",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: "15px",
    flexGrow: 1
  },

  teste: {
    border: "0px solid"
  },

  buttonAdd: {
    backgroundColor: "#007bff",

    marginTop: "10%"
  },

  modal: {
    marginTop: "10vh",    
  },

  inputBase: {
    marginLeft: "1.5%",
    color: "black",
    "&:hover ": {
      backgroundColor: "lightgrey"
    }
  }
}));
