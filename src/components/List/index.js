import React, { useState, useEffect } from "react";
import { Container } from "./styles";
import { MdAdd } from "react-icons/md";
import axios from "axios";
import Card from "../Card";

export default function List({ usuario, board, data, index: listIndex }) {

  const [card, setCard] = useState(data);  

  const insertCard = e => {
    var maior = 0;
    for (var i = 0; i < data.cards.length; i++) {
      if (data.cards[i].id > maior) {
        maior = data.cards[i].id;
      }
    }

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

    setCard(data.cards.unshift(defaultCard))
    saveNewCard()
  };

  
  const saveNewCard = () => {
    const list = board;
   
    console.log("list"+ list)

  
    const method = "put";
    const url = `http://localhost:5000/board/${list.id}`;

    axios[method](url, list).then(resp => {
       const comentario = resp.data;
       console.log(comentario);
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
          {data.cards.map((card, index) => (
            <>
              <Card
                key={card.id}
                listIndex={listIndex}
                index={index}
                data={card}
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
