import styled from 'styled-components';
import { makeStyles } from "@material-ui/core/styles";

export const LogoContainer = styled.div`
   flex-grow : 1;
`;

export const useStyles = makeStyles(theme => ({
   root: {
     flexGrow: 1,    
   },
   menuButton: {
     marginRight: theme.spacing(2)
   },
   title: {
     flexGrow: 1
   }
 }));