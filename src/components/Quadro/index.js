import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "./styles";

export default function Quadro(data) {
  const baseUrl = "http://localhost:3001/board";
  const [lists, setList] = useState([]);

  useEffect(() => {
    axios(baseUrl).then(resp => {
      setList(resp.data);
    });
  }, []);

  console.log(lists.map(quadro => quadro.quadro));

  return (
    <>
      {lists.map(lists => (
        <Container>
          <h1>{lists.quadro} </h1>
        </Container>
      ))}
    </>
  );
}
