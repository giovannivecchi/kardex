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
  LabelComentario,
  Header,
  LabelCard,
  Tag
} from "./styles";

import axios from "axios";
import BorderContext from "../Board/context";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";

import IconSubject from "@material-ui/icons/Subject";
import IconComment from "@material-ui/icons/Comment";
import IconNearMe from "@material-ui/icons/NearMe";
import "date-fns";
import TextField from "@material-ui/core/TextField";

import { useStyles } from "./styles";


export default function Card({ usuario, board, data, index, listIndex }) {
  const ref = useRef();
  const ref2 = useRef();
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
        console.log(item)
      } else {
        move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);
        item.listIndex = targetListIndex;
      }
    }
  });

  dragRef(dropRef(ref));

  const initialComments = {
    id: index,
    board: board.id,
    comentario: [ ]
  };

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
    const getComentarios = `http://localhost:5000/comentarios/${board.produce[listIndex].cards[index].id}`;
    axios(getComentarios).then(resp => {
      setComentarios(resp.data);
      console.log(resp.data)
    });
  };

  const [showModal, setShowModal] = useState(false);
  const [target, setTarget] = useState(null);

  const handleClickModal = event => {
    setShowModal(!showModal);
    setTarget(event.target);
  };

  const [lists, setList] = useState(data);
  const baseUrl = "http://localhost:5000/board";
  const [initialState, setInitialState] = useState(data);

  const clear = () => {
    setList(initialState);
    handleClose();
  };

  const save = () => {
    if (alterado !== false) {
      const card = lists;
      console.log(lists);
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
    const sendComentarios = [...comentarios.comentario]
    sendComentarios.unshift(NewComentarios);

    // var maior = 0;
    // for (var i = 0; i < comentarios.comentario.length; i++) {
    //   if (comentarios.comentario[i].id > maior) {
    //     maior = comentarios.comentario[i].id;
    //   }
    // }

    let id = board.produce[listIndex].cards[index].id
    console.log(comentarios.comentario.length)
    const method = comentarios.id ? "put" : "post";
    const url = "http://localhost:5000/comentarios";
    const getComentarios = comentarios.id ? `${url}/${id}` : url;
    const envio = { id: id,
                    board: board.id,
                    comentario: sendComentarios };
    
    setComentarios(envio);
    console.log(envio)

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
    for (var i = 0; i < comentarios.length; i++) {
      if (comentarios.comentario[i].id > maior) {
        maior = comentarios.comentario[i].id;
      }
    }

    comentario.id = maior + 1;
    comentario.board = board.id;
    comentario.username = usuario.username;
    comentario.imagem = usuario.imagem;
    comentario.data = data.getDate();
    comentario[e.target.name] = e.target.value;
    setNewComentarios(comentario);
  };

  var now = new Date();

  const AddEtiqueta = color => {
    const tags = board;

    if (tags.produce[listIndex].cards[index].labels.indexOf(color) !== -1) {
      tags.produce[listIndex].cards[index].labels.splice(
        tags.produce[listIndex].cards[index].labels.indexOf(color),
        1
      );
    } else {
      tags.produce[listIndex].cards[index].labels.push(color);
    }
    console.log(tags);
    setList({ list: tags });
    setAlterar(true);
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
            <Col xs={11} md={11} mt={11}>
              <Modal.Title>
                <Titulo
                  title={"Nome do Card"}
                  value={lists.content}
                  name="content"
                  type="text"
                  maxlength="38"
                  onChange={e => {
                    updateField(e);
                  }}
                ></Titulo>
              </Modal.Title>
            </Col>
          </Modal.Header>
          <Modal.Body>
            <Overlay
              show={showModal}
              target={target}
              placement="right"
              container={ref2.current}
              containerPadding={20}
            >
              <Popover id="popover-contained">
                <Popover.Title style={{ color: "black" }} as="h3">
                  Etiquetas
                </Popover.Title>
                <Popover.Content>
                  <Row>
                    <Tag
                      color={"#B11"}
                      onClick={e => {
                        AddEtiqueta("#B11");
                        handleClickModal(e);
                      }}
                    >
                      Urgente
                    </Tag>
                  </Row>
                  <Row>
                    <Tag
                      color={"#F1F111"}
                      onClick={e => {
                        AddEtiqueta("#F1F111");
                        handleClickModal(e);
                      }}
                    >
                      Pausado
                    </Tag>
                  </Row>
                  <Row>
                    <Tag
                      color={"#39fc03"}
                      onClick={e => {
                        AddEtiqueta("#39fc03");
                        handleClickModal(e);
                      }}
                    >
                      Concluído
                    </Tag>
                  </Row>
                  <Row>
                    <Tag
                      color={"#03cefc"}
                      onClick={e => {
                        AddEtiqueta("#03cefc");
                        handleClickModal(e);
                      }}
                    >
                      Correção
                    </Tag>
                  </Row>
                  <Row>
                    <Tag
                      color={"#7b03fc"}
                      onClick={e => {
                        AddEtiqueta("#7b03fc");
                        handleClickModal(e);
                      }}
                    >
                      Importante
                    </Tag>
                  </Row>
                </Popover.Content>
              </Popover>
            </Overlay>

            <Row style={{ marginBottom: "2vh" }}>
              <Col xs={12} md={12} mt={12} style={{ marginLeft: "3vw" }}>
                {data.labels.map(label => (
                  <LabelCard key={label} color={label} />
                ))}
                <Button
                  ref={ref2}
                  variant="info"
                  style={{
                    textAlign: "center",
                    borderRadius: "10px",
                    marginTop: "-0.5vh"
                  }}
                  onClick={handleClickModal}
                >
                  +
                </Button>
              </Col>
              <Col xs={3} md={3} mt={3}></Col>
            </Row>
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
                  <Col xs={3} md={3} mt={3} >
                    <TextField
                      id="date"
                      label="Previsão de Entrega"
                      type="date"
                      name="previsaoEntrega"
                      value={lists.previsaoEntrega}
                      style={{ float: "left" }}
                      defaultValue={`${now.getFullYear()}-${now.getMonth() +
                        1}-${now.getDate()}`}
                      InputLabelProps={{
                        shrink: true
                        
                      }}
                      onChange={e => {
                        updateField(e);
                      }}
                    />
                  </Col>
                  <Col xs={3} md={3} mt={3} >
                    <TextField
                      id="date"
                      label="Data de Entrega"
                      name="dataEntrega"
                      value={lists.dataEntrega}
                      type="date"
                      style={{ float: "left" }}
                      defaultValue={`${now.getFullYear()}-${now.getMonth() +
                        1}-${now.getDate()}`}
                      InputLabelProps={{
                        shrink: true
                      }}
                      onChange={e => {
                        updateField(e);
                      }}
                    />
                  </Col>
                  <Col xs={3} md={3} mt={3} >
                    <TextField
                      id="adicionais"
                      label="Dados Adicionais"
                      type="text"
                      name="adicionais"
                      value={lists.adicionais}
                      style={{ float: "left" }}
                      InputLabelProps={{
                        shrink: true
                      }}
                      onChange={e => {
                        updateField(e);
                      }}
                    />
                  </Col>
                </Row>

                <Row style={{ marginBottom: "1vh" }}>
                  <Subtitle>
                    <IconComment style={{ marginLeft: "10px" }} />
                    Comentarios
                  </Subtitle>
                </Row>
                <Row>
                  <Col xs={1} md={1} mt={1}>
                    <Img src={"https://mpng.pngfly.com/20181205/ppu/kisspng-vector-graphics-computer-icons-user-profile-portab-writer-recommend-svg-png-icon-free-download-9768-5c0851b175d215.4257304515440490734826.jpg"} alt="" />
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
                <Col xs={8} md={8} mt={8} ></Col>
            
                  <Col xs={2} md={2} mt={2}>
                  <Button
                    size="sm"
                    style={{ float: "right" }}
                    variant="outline-primary"
                    onClick={e => {
                      saveComentarios(e);
                    }}
                  >
                    <IconNearMe fontSize="small" />
                    Enviar
                  </Button>
                  </Col>
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
                            <ImgComment src={"https://mpng.pngfly.com/20181205/ppu/kisspng-vector-graphics-computer-icons-user-profile-portab-writer-recommend-svg-png-icon-free-download-9768-5c0851b175d215.4257304515440490734826.jpg"} alt="" />
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
          <Header>
            {data.labels.map(label => (
              <Label key={label} color={label} />
            ))}
          </Header>

          <p>{data.content}</p>
          {data.user.map(user => (
            <Img src={user} alt="" />
          ))}
        </Container>
      </div>
    </>
  );
}
