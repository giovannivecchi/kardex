import styled from "styled-components";

export const Container = styled.div`
  @import url("https://fonts.googleapis.com/css?family=Poppins&display=swap");
  padding: 30px;
  border-radius: 4px;
  margin-top: 10vh;
  & + div {
    margin-left: 10vh
    }
  font-family: "Poppins", sans-serif;
  width: 90vw;
  height: 80vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 15px;

  .card {
    position: relative;
    width: 300px;
    height: 400px;
    margin: 0 auto;
    background: #ffff;
    text-shadow: 0 15px 60px rgba(0, 0, 0, 0.5);
  }

  .card .face {
    box-shadow: 0 9px 7px 3px rgba(192, 208, 230, 1);
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  strong: {
    display: block;
  }
`;

export const Label = styled.span`
  font-size: 3em;
  border-radius: 2px;
  display: inline-block;
  background: ${props => props.color};
`;
