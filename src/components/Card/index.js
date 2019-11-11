import React, { useState, useRef, useContext } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Container, Label, TextArea } from "./styles";
import axios from "axios";
import BorderContext from "../Board/context";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useStyles } from "./styles";

export default function Card({ board, data, index, listIndex }) {
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
  const [title, setTitle] = useState("none");
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);    
    

  };
  const handleTitle = () => {
    setTitle(" 1px solid #FFF");
  };
  
  const [lists, setList] = useState(data);
  const baseUrl = "http://localhost:3001/board";
  const initialState = data;   

  const clear = () => {
    setList({ lists: initialState });
    handleClose();
  };

  const save = () => {
    const card = lists;
    
    const method = "put";    
    const url = data.id ? `${baseUrl}/${board.id}` : baseUrl;
    axios[method](url, card.list)
      .then(resp => {
        const list = getUpdatedList(resp.data);
        setList({ lists: initialState.id, list });
      })
      .catch(err => {
        console.log(err);
      });
    handleClose();
  };

  const getUpdatedList = card => {
    const list = card.filter(u => u.id !== data.id);
    return list;
  };

  const updateField = e => {
    const card = { ...board };   
    
    card.produce[listIndex].cards[index][e.target.name] = e.target.value;    
    setList({ list : card });
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
            <Col xs={8} md={8} mt={2}>
              <Modal.Title>
                <TextArea
                  title={title}
                  value={lists.content}
                  name="content"
                  onChange={e => {
                    updateField(e);
                    handleTitle(e);
                  }}
                ></TextArea>
              </Modal.Title>
            </Col>
          </Modal.Header>
          <Modal.Body>
            <Col xs={12} md={12}>
              {data.descricao}
            </Col>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={e => save(e)}>
              Salvar
            </Button>
            <Button variant="primary" onClick={e => clear(e)}>
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
