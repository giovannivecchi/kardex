import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";

export const LogoContainer = styled.div`
  flex-grow: 1;
  transition: opacity 0.2s;
  :hover{
    opacity: 1.7;
  }
  img {
    margin-left: 2vw;
    height: 7vh;
    width: 7vw;
  }
`;

export const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  textField: {
    width: 200,
  },
}));
