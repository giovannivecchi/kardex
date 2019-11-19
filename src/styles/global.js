import { createGlobalStyle } from "styled-components";

//Adicionando as styles globais e acrescentando font roboto
export default createGlobalStyle`
   @import url('https://fonts.googleapis.com/css?family=Roboto:500&display=swap');
    *{
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
        
    }

    html, body , #root{
        height: 70vh;
        background: linear-gradient(to right, #DAE6E2, #DAE6E2);
        width: 95vw;        
    }
    
    body{
        font: 14px 'Roboto', sans-serif;
        background: #ecf1f8;
        color: #333;
        -webkit-font-smoothing: antialiased !important;
      

    ul{
        list-style: none;
    }

`;
 /* -webkit-font-smoothing: antialiased !important = deixar a font mais detalhada , retira a pixerização
 list-style: none; = retira as bolinhas da lista
background: #ecf1f8; */
