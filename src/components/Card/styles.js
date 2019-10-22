import styled, { css } from "styled-components";
import { makeStyles } from "@material-ui/core/styles";

export const Container = styled.div`
  position: relative;
  background: #fff;
  border-radius: 20px;
  margin-bottom: 10px;  
  padding: 15px;
  box-shadow: 0 9px 7px 3px rgba(192, 208, 230, 1.0);
  border-top: 20px solid rgba(230, 236, 245, 0.4);
  cursor: grab;
  border: 10px solid rgba(230, 236, 245, 0.2);

  header {
    position: absolute;    
    top: -12px;
    left: 300px;
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

export const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 400,
    height: 500,
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #D3D3D3",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: "15px",
    flexGrow: 1
  },
  inputBase: {
    color: "black",
    "&:hover ": {
      backgroundColor: "lightgrey",
      
    }
  }
}));
