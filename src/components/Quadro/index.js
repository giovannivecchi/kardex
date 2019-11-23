import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Label } from "./styles";
import { Link } from "react-router-dom";

export default function Quadro(data) {
  const getBoard = `http://localhost:5000/usuario/${window.location.search.replace(
    "?id=",
    ""
  )}`;
 
  const [lists, setList] = useState([]);
  const [board, setBoard] = useState([])
  const [usuario, setUsuario] = useState([])

  const saveBoard = async (NewBoard, Usuario) => {
    // const baseUrlBoard = `http://localhost:5000/board`;

    // axios(baseUrlBoard).then(resp => {

    //   const sendBoard = [resp.data]
    //   sendBoard.unshift(NewBoard);
    //   console.log(sendBoard);

    const card = NewBoard;
    const method = "post";
    const url = "http://localhost:5000/Board";

    axios[method](url, card).then(resp2 => {
   
      const newUsuario = Usuario;
   
      newUsuario.board.push(resp2.data.id)
   
      setList([resp2.data]);

      const method = "put";
      const url2 = `http://localhost:5000/usuario/${newUsuario.id}`;
      console.log(resp2.data.id)
      axios[method](url2, newUsuario).then(resp3  => {
         console.log(resp3.data) 
      
        });
    });
  };

  useEffect(() => {
    axios(getBoard).then(resp => {
      if (resp.data.board == "" || resp.data.board == undefined) {
        const initialQuadro = 
          {
            quadro: "Quadro do " + resp.data.username,
            email: resp.data.email,
            produce: [
              {
                title: "Tarefas",
                creatable: true,
                cards: [
                  {
                    id: 1,
                    content: "Adicione um texto",
                    labels: [],
                    user: [
                      "https://mpng.pngfly.com/20181205/ppu/kisspng-vector-graphics-computer-icons-user-profile-portab-writer-recommend-svg-png-icon-free-download-9768-5c0851b175d215.4257304515440490734826.jpg"
                    ],
                    visible: true,
                    descricao: "Adicione uma Descrição",
                    comments: []
                  },

                  {
                    id: 1000,
                    content: "Gravar testes e deploy ReactJS",
                    labels: ["#54e1f7"],
                    user: [
                      "https://mpng.pngfly.com/20181205/ppu/kisspng-vector-graphics-computer-icons-user-profile-portab-writer-recommend-svg-png-icon-free-download-9768-5c0851b175d215.4257304515440490734826.jpg"
                    ],
                    visible: false,
                    descricao: "Realizar o estudo do Modulo 1",
                    comments: []
                  }
                ]
              },
              {
                title: "Desenvolvendo",
                creatable: true,
                cards: [
                  {
                    id: 2,
                    content: "Adicione um texto",
                    labels: [],
                    user: [
                      "https://mpng.pngfly.com/20181205/ppu/kisspng-vector-graphics-computer-icons-user-profile-portab-writer-recommend-svg-png-icon-free-download-9768-5c0851b175d215.4257304515440490734826.jpg"
                    ],
                    visible: true,
                    descricao: "Adicione uma Descrição",
                    comments: []
                  },
                  {
                    id: 14,
                    content: "Criando map",
                    labels: [],
                    user: [
                      "https://avatars1.githubusercontent.com/u/50504236?s=460&v=4"
                    ],
                    visible: false,
                    descricao: "Realizar o estudo do Modulo 1",
                    comments: []
                  }
                ]
              },
              {
                title: "Validação",
                creatable: true,
                cards: [
                  {
                    id: 3,
                    content: "Adicione um texto",
                    labels: [],
                    user: [
                      "https://mpng.pngfly.com/20181205/ppu/kisspng-vector-graphics-computer-icons-user-profile-portab-writer-recommend-svg-png-icon-free-download-9768-5c0851b175d215.4257304515440490734826.jpg"
                    ],
                    visible: true,
                    descricao: "Adicione uma Descrição",
                    comments: []
                  },
                  {
                    id: 9,
                    content: "Ajustes na biblioteca unform",
                    labels: [],
                    visible: false,
                    descricao: "Realizar o estudo do Modulo 1",
                    user: [],
                    comments: []
                  }
                ]
              },
              {
                title: "Concluído",
                creatable: true,
                done: false,
                cards: [
                  {
                    id: 4,
                    content: "Adicione um texto",
                    labels: [],
                    user: [
                      "https://mpng.pngfly.com/20181205/ppu/kisspng-vector-graphics-computer-icons-user-profile-portab-writer-recommend-svg-png-icon-free-download-9768-5c0851b175d215.4257304515440490734826.jpg"
                    ],
                    visible: true,
                    descricao: "Adicione uma Descrição",
                    comments: []
                  },
                  {
                    id: 13,
                    content:
                      "Gravar Aula Internacionalização de aplicações Node.js, ReactJS e React Native",
                    labels: ["#7159c1"],
                    visible: false,
                    descricao: "Realizar o estudo do Modulo 1",
                    user: [],
                    comments: []
                  }
                ]
              }
            ]
          }
        
        
        setUsuario(resp.data)
        setList([initialQuadro]);
        saveBoard(initialQuadro, resp.data );
      } else {
        setUsuario(resp.data)
        const baseUrl = `http://localhost:5000/board/${resp.data.board}`;
        axios(baseUrl).then(resp => {
          setList([resp.data]);
        });
      }
    });
  }, []);

  lists.map(quadro => quadro.quadro);
 
  return (
    <>
      <Container>
        {lists.map(lists => (
          <div className="card">
            <Link to={"/board/" + lists.id} >
              <div className="card face">
                <Label>{lists.quadro} {lists.id} </Label>
              </div>
            </Link>
          </div>
        ))}
      </Container>
    </>
  );
}
