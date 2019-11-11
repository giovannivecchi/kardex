import styled, { css } from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import { darken } from "polished";

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
    background: ${darken(0.03, "#FFFDFF")}
  }

  header {
    position: absolute;
    top: -12px;
    left: 90%;
    width: 100px;
  }

  p {
    font-weight: 500;
    line-height: 20px;
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
      header {
        height: 0px;
      }
    `}
`;

export const Label = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 2px;
  display: inline-block;
  background: ${props => props.color};
`;

export const TextArea = styled.input`
  background: transparent;
  border-radius: 3px;
  box-shadow: none;
  font-size: 20px;
  font-weight: 600;
  border-style: ${props => props.title};

  line-height: 24px;
  margin: -4px -8px;
  min-height: 24px;
  padding: 4px 8px;
  resize: none;
  overflow: hidden;
  overflow-wrap: break-word;
  height: 33px;
  width: 80%;
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
    marginTop: "5%"
  },

  inputBase: {
    marginLeft: "1.5%",
    color: "black",
    "&:hover ": {
      backgroundColor: "lightgrey"
    }
  }
}));
