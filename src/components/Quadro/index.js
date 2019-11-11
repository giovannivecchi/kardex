import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Label } from "./styles";
import { Link } from "react-router-dom";

export default function Quadro(data) {
  const baseUrl = "http://localhost:3001/board";
  const [lists, setList] = useState([]);

  useEffect(() => {
    axios(baseUrl).then(resp => {
      setList(resp.data);
    });
  }, []);

  (lists.map(quadro => quadro.quadro));

  return (
    <>
      <Container>
        {lists.map(lists => (
          <div className="card">
            <Link to="/">
              <div className="card face">
                <Label>{lists.quadro} </Label>
              </div>
            </Link>
          </div>
        ))}
      </Container>
    </>
  );
}
