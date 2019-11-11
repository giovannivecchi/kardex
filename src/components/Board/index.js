import React, { useState, useEffect } from "react";
import List from "../List";
import produce from "immer";
import axios from "axios";
//import { loadLists } from "../../services/api";
import BoardContext from "./context";

import { Container } from "./styles";

const initialState = {
  board: [
    {
      id: 1,
      quadro: "",
      produce: [
        {
          title: "",
          creatable: true,
          name: "",
          cards: [
            {
              id: 1,
              content: "Estudar módulo 01 de NodeJS",
              labels: ["#7159c1"],
              user:
                "https://avatars3.githubusercontent.com/u/50344535?s=460&v=4",
              visible: false,
              descricao: "Realizar o estudo do Modulo 1"
            }
          ]
        }
      ]
    }
  ]
};

export default function Board() {
  const baseUrl = "http://localhost:3001/board";
  const [lists, setList] = useState(initialState.board[0].produce);
  const [board, setBoard] = useState(initialState.board);

  useEffect(() => {
    axios(baseUrl).then(resp => {
      setList(resp.data[1].produce);
      setBoard(resp.data[1]);
    });
  }, []);

  function move(fromList, toList, from, to) {
    setList(
      produce(lists, draft => {
        const dragged = draft[fromList].cards[from];
        draft[fromList].cards.splice(from, 1);
        draft[toList].cards.splice(to, 0, dragged);
      })
    );    
  }

  return (
    <BoardContext.Provider value={{ lists, move }} >
      <Container>
        {lists.map((list, index) => (
          <List key={list.title} index={index} data={list} board={board} />
        ))}
      </Container>
    </BoardContext.Provider>
  );
}
