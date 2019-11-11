import React from "react";
import { Container } from "./styles";
import { MdAdd } from "react-icons/md";
import Card from "../Card";

export default function List({ board, data, index: listIndex }) {
  const result = data;  
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
                onClick={() => console.log(result.cards)}
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
