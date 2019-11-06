import styled from 'styled-components';

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
  margin-top: 10%;
  width: 250px;
  height: 150px;
`;


export const Label = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 2px;
  display: inline-block;
  background: ${props => props.color};
`;