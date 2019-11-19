import React, { useState, useRef, useContext } from "react";
import { useDrag, useDrop } from "react-dnd";
import {
  Container,
  Label,
  Subtitle,
  Titulo,
  Descricao,
  Img,
  Comentario,
  Line,
  ImgComment,
  QuadroComentario,
  TextoComentario,
  LabelUsuario,
  LabelComentario
} from "./styles";

import axios from "axios";
import BorderContext from "../Board/context";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import IconSubject from "@material-ui/icons/Subject";
import IconComment from "@material-ui/icons/Comment";
import IconNearMe from "@material-ui/icons/NearMe";
import "date-fns";
import TextField from "@material-ui/core/TextField";

import { useStyles } from "./styles";

const initialComments = {
  id: null,
  comentario: [
    {
      id: null,
      username: "",
      imagem: "",
      data: "",
      comment: ""
    }
  ]
};

export default function Card({ usuario, board, data, index, listIndex }) {
  const ref = useRef();
  const { move } = useContext(BorderContext);

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: "CARD", index, listIndex },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const [, dropRef] = useDrop({
    accept: "CARD",
    hover(item, monitor) {
      const draggedListIndex = item.listIndex;
      const targetListIndex = listIndex;
      const draggedIndex = item.index;
      const targetIndex = index;

      if (
        draggedIndex === targetIndex &&
        draggedListIndex === targetListIndex
      ) {
        return;
      }

      const targetSize = ref.current.getBoundingClientRect();
      const targetCenter = (targetSize.bottom - targetSize.top) / 2;

      const draggedOffset = monitor.getClientOffset();
      const draggedTop = draggedOffset.y - targetSize.top;

      if (draggedIndex < targetIndex && draggedTop < targetCenter) {
        return;
      }

      if (draggedIndex > targetIndex && draggedTop > targetCenter) {
        return;
      }
      if (data.visible !== false) {
        move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);

        item.index = targetIndex;
        item.listIndex = targetListIndex;
      } else {
        move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);
        item.listIndex = targetListIndex;
      }
    }
  });

  dragRef(dropRef(ref));

  const classes = useStyles();
  const [comentarios, setComentarios] = useState(initialComments);
  const [NewComentarios, setNewComentarios] = useState(
    initialComments.comentario
  );
  const [show, setShow] = useState(false);
  const [alterado, setAlterar] = useState(false);

  const handleClose = () => {
    setShow(false);
    setAlterar(false);
  };
  const handleShow = () => {
    setShow(true);
    const getComentarios = `http://localhost:3001/comentarios/${lists.id}`;
    axios(getComentarios).then(resp => {
      setComentarios(resp.data);
    });
  };

  const [lists, setList] = useState(data);
  const baseUrl = "http://localhost:3001/board";
  const [initialState, setInitialState] = useState(data);

  const clear = () => {
    setList(initialState);
    handleClose();
  };

  const save = () => {
    if (alterado !== false) {
      const card = lists;

      const method = "put";
      const url = data.id ? `${baseUrl}/${board.id}` : baseUrl;
      axios[method](url, card.list)
        .then(resp => {
          const list = getUpdatedList(resp.data);
          setList(list);

          setInitialState(list);
          setAlterar(false);
        })
        .catch(err => {
          console.log(err);
        });
    }
    handleClose();
  };

  const getUpdatedList = card => {
    return card.produce[listIndex].cards[index];
  };

  const updateField = e => {
    setAlterar(true);
    const card = { ...board };

    card.produce[listIndex].cards[index][e.target.name] = e.target.value;
    setList({ list: card });
  };

  const saveComentarios = () => {
    const sendComentarios = [...comentarios.comentario];
    sendComentarios.unshift(NewComentarios);

    const card = comentarios;
    const method = card.id ? "put" : "post";
    const url = "http://localhost:3001/comentarios";
    const getComentarios = card.id ? `${url}/${card.id}` : url;
    const envio = { id: card.id, comentario: sendComentarios };

    axios[method](getComentarios, envio).then(resp => {
      const comentario = resp.data;
      console.log(comentario);
      setComentarios(comentario);
    });
  };

  const updateComments = e => {
    const comentario = {};
    var data = new Date();

    var maior = 0;
    for (var i = 0; i < comentarios.comentario.length; i++) {
      if (comentarios.comentario[i].id > maior) {
        maior = comentarios.comentario[i].id;
      }
    }

    comentario.id = maior + 1;

    comentario.username = usuario.username;
    comentario.imagem = usuario.imagem;
    comentario.data = data.getDate();
    comentario[e.target.name] = e.target.value;
    setNewComentarios(comentario);
  };

  var now = new Date();

  return (
    <>
      <Modal
        size="lg"
        dialogClassName={classes.modal}
        show={show}
        onHide={handleClose}
      >
        <form>
          <Modal.Header closeButton>
            <Col xs={10} md={11} mt={11}>
              <Modal.Title>
                <Titulo
                  title={"Nome do Card"}
                  value={lists.content}
                  name="content"
                  onChange={e => {
                    updateField(e);
                  }}
                ></Titulo>
              </Modal.Title>
            </Col>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col xs={12} md={12} mt={12} style={{ marginLeft: "4vw" }}>
                <Row>
                  <Col xs={12} md={12} mt={12}>
                    <Subtitle>
                      <IconSubject />
                      Descrição
                    </Subtitle>
                  </Col>
                </Row>
                <Row style={{ marginBottom: "3vh" }}>
                  <Descricao
                    value={lists.descricao}
                    name="descricao"
                    placeholder="Adicione uma descrição detalhada...."
                    onChange={e => {
                      updateField(e);
                    }}
                  ></Descricao>
                </Row>
                <Row style={{ marginBottom: "3vh" }}>
                  <Col xs={3} md={3} mt={3} style={{ textAlign: "left" }}>
                    <TextField
                      id="date"
                      label="Previsão de Entrega"
                      type="date"
                      defaultValue={`${now.getFullYear()}-${now.getMonth() +
                        1}-${now.getDate()}`}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </Col>
                  <Col xs={9} md={9} mt={9} style={{ textAlign: "left" }}>
                    <TextField
                      id="date"
                      label="Data de Entrega"
                      type="date"
                      defaultValue={`${now.getFullYear()}-${now.getMonth() +
                        1}-${now.getDate()}`}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </Col>
                </Row>
                <Row style={{marginBottom: "1vh"}}>
                  <Subtitle>
                    <IconComment style={{ marginLeft: "10px" }} />
                    Comentarios
                  </Subtitle>
                </Row>
                <Row>
                  <Col xs={1} md={1} mt={1}>
                    <Img src={usuario.imagem} alt="" />
                  </Col>
                  <Col xs={11} md={11} mt={11} style={{ textAlign: "left" }}>
                    <Comentario
                      type="text"
                      placeholder="Escreva um comentário"
                      name="comment"
                      value={comentarios.comentario.comment}
                      onChange={e => updateComments(e)}
                    />
                  </Col>
                </Row>
                <Row>
                  <Button
                    size="sm"
                    style={{ marginLeft: "71.4%", marginTop: "0%" }}
                    variant="outline-primary"
                    onClick={e => {
                      saveComentarios(e);
                    }}
                  >
                    <IconNearMe fontSize="small" />
                    Enviar
                  </Button>
                </Row>
                <Row>
                  <Line></Line>
                </Row>
                <QuadroComentario>
                  {comentarios.comentario !== undefined &&
                    comentarios.comentario.map(comment => (
                      <TextoComentario>
                        <Row>
                          <Col xs={1} md={1} mt={1}>
                            <ImgComment src={comment.imagem} alt="" />
                          </Col>
                          <Col xs={11} md={11} mt={11}>
                            <LabelUsuario>{comment.username}</LabelUsuario>
                          </Col>
                        </Row>
                        <Row style={{ marginBottom: "2vh" }}>
                          <Col
                            xs={12}
                            md={12}
                            mt={12}
                            style={{ marginTop: "1vh", marginLeft: "1vw" }}
                          >
                            <LabelComentario>{comment.comment}</LabelComentario>
                          </Col>
                        </Row>
                      </TextoComentario>
                    ))}
                </QuadroComentario>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={e => save(e)}>
              Salvar
            </Button>
            <Button variant="secondary" onClick={e => clear()}>
              Cancelar
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
      <div onClick={handleShow}>
        {data.visible && <p>{data.visible}</p>}
        <Container ref={ref} isDragging={isDragging} isVisible={data.visible}>
          <header>
            {data.labels.map(label => (
              <Label key={label} color={label} />
            ))}
          </header>

          <p>{data.content}</p>
          {data.user && <img src={data.user} alt="" />}
        </Container>
      </div>
    </>
  );
}
