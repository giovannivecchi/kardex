import React, { useState, useRef, useContext } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Container, Label, TextArea } from "./styles";
import BorderContext from "../Board/context";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useStyles } from "./styles";

export default function Card({ data, index, listIndex }) {
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
  const handleShow = () => setShow(true);
  const handleTitle = () => setTitle(" 1px solid #FFF");

  return (
    <>
      <Modal
        size="lg"
        bsPrefix={classes.modal}
        show={show}
        onHide={handleClose}
      >
        <form>
          <Modal.Header closeButton>
            <Col xs={8} md={8}>
              <Modal.Title>
                <TextArea title={title} onChange={handleTitle}>
                  {data.content}
                </TextArea>
              </Modal.Title>
            </Col>
          </Modal.Header>
          <Modal.Body>
            <Col xs={12} md={12}>
              {data.descricao}
            </Col>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Fechar
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Salvar
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
