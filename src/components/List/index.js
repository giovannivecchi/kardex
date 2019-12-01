import React, { useState } from "react";
import { Container } from "./styles";
import { MdAdd } from "react-icons/md";
import axios from "axios";
import Card from "../Card";

export default function List({ usuario, board, data, index: listIndex }) {
  const [card, setCard] = useState(data);
  const [newBoard, setBoard] = useState(board);
  var ativo = false;

  const insertCard = async e => {
    const url = `http://localhost:5000/board/${board.id}`;
    const result = await axios(url).then(resp => {
      if (resp.data.id > 0) {
        setBoard(resp.data);
      }
      return resp;
    });

    var maior = 0;
    for (var i = 0; i < result.data.produce.length; i++) {
   
      for (var j = 0 ; j< result.data.produce[i].cards.length; j++){
    
        if (result.data.produce[i].cards[j].id > maior) {
          maior = result.data.produce[i].cards[j].id;
        }
      }
    
    }
   
    // var maior = 0;
    // for (var i = 0; i < data.cards.length; i++) {
    //   if (data.cards[i].id > maior) {
    //     maior = data.cards[i].id;
    //   }
    // }
    const defaultCard = {
      id: maior + 1,
      content: "Adicione um texto",
      labels: [],
      user: [
        "https://mpng.pngfly.com/20181205/ppu/kisspng-vector-graphics-computer-icons-user-profile-portab-writer-recommend-svg-png-icon-free-download-9768-5c0851b175d215.4257304515440490734826.jpg"
      ],
      visible: true,
      descricao: "Adicione uma descrição",
      comments: []
    };

    if (result.data !== undefined) {
      result.data.produce[listIndex].cards.unshift(defaultCard)
      console.log(result.data)
    }

    saveNewCard(result.data.produce[listIndex].cards);
  };

  const saveNewCard = cards => {
    var list;

    if (ativo === false) {
      setBoard(board);
      list = board;
    } else {
      list = newBoard;
    }
    list.produce[listIndex].cards = cards;
    setBoard(list);
    const newCard = card;
    newCard.cards = cards;
    setCard(newCard)
    console.log(newCard)
    const method = "put";
    const url = `http://localhost:5000/board/${list.id}`;

    axios[method](url, list).then(resp => {
      ativo = true;
      setBoard(resp.data);
      console.log(resp.data);
    });
  };



  return (
    <>
      <Container done={data.done}>
        <header>
          <h2>{data.title}</h2>
          {data.creatable && (
            <button type="button">
              <MdAdd
                size={24}
                color="#FFF"
                onClick={e => insertCard(e)}
              ></MdAdd>
            </button>
          )}
        </header>
        <ul>
          {data.cards !== undefined && data.cards.map((cards, index) => (
            <>
              <Card
                key={cards.id}
                listIndex={listIndex}
                index={index}
                data={cards}
                board={board}
                usuario={usuario}
              />
            </>
          ))}
        </ul>
      </Container>
    </>
  );
}

/*
{data.creatable && (
                    <button type='button'>
                        <MdAdd size={24} color='#FFF'></MdAdd>
                    </button>
                )}

só ira criar o botao caso dado creatable escriver como true
*/
