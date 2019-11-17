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
  QuadroComentario
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

import { useStyles } from "./styles";

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

  const [show, setShow] = useState(false);
  const [alterado, setAlterar] = useState(false);

  const handleClose = () => {
    setShow(false);
    setAlterar(false);
  };
  const handleShow = () => {
    setShow(true);
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

  // const updateLists = e => {
  //   const lists = { ...board };

  //   lists.produce[listIndex].cards[index][e.target.name] = e.target.value;
  //   setList({ list: card });
  // };

  const addComment = comments => {
    if (comments) {
      comments.map(function(comment) {
        return (
          <>
            <Row>
              <Col xs={1} md={1} mt={1}>
                <ImgComment src={comment.imagem} alt="" />
              </Col>
              <Col xs={11} md={11} mt={11}>
                {comment.username}
              </Col>
            </Row>
          </>
        );
      });
    }
  };

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
              <Col xs={8} md={8} mt={8}>
                <Row>
                  <Col xs={12} md={12} mt={12}>
                    <Subtitle>
                      <IconSubject />
                      Descrição
                    </Subtitle>
                  </Col>
                </Row>
                <Row>
                  <Descricao
                    value={lists.descricao}
                    name="descricao"
                    placeholder="Adicione uma descrição detalhada...."
                    onChange={e => {
                      updateField(e);
                    }}
                  ></Descricao>
                </Row>
                <Row>
                  <Subtitle>
                    <IconComment style={{ marginLeft: "11px" }} />
                    Comentarios
                  </Subtitle>
                </Row>
                <Row>
                  <Col xs={1} md={1} mt={1}>
                    <Img src={usuario.imagem} alt="" />
                  </Col>
                  <Col xs={11} md={11} mt={11}>
                    <Comentario placeholder="Escreva um comentário" />
                  </Col>
                </Row>
                <Row>
                  <Button
                    size="sm"
                    style={{ marginLeft: "67.2%", marginTop: "-1%" }}
                    variant="outline-primary"
                  >
                    <IconNearMe fontSize="small" />
                    Enviar
                  </Button>
                </Row>
                <Row>
                  <Line></Line>
                </Row>
                <QuadroComentario>
                  {lists.comments !== undefined &&
                    lists.comments.map(comment => (                      
                      <Row>
                      <Col xs={1} md={1} mt={1}>
                        <ImgComment src={comment.imagem} alt="" />
                      </Col>
                      <Col xs={11} md={11} mt={11}>
                        {comment.username}
                      </Col>
                    </Row>
                    ))}
                </QuadroComentario>
              </Col>

              <Col
                xs={4}
                md={4}
                mt={4}
                style={{ border: "1px solid", float: "right" }}
              >
                Botoes
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
