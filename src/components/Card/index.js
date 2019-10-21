import React, { useRef, useContext } from "react";
import { useDrag, useDrop } from "react-dnd";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Container, Label } from "./styles";
import BorderContext from "../Board/context";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import InputBase from "@material-ui/core/InputBase";

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

  function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
      position: "fixed",
      top: `${top}%`,
      left: `${left}%`,
      width: "80%",
      overflow: "auto",
      transform: `translate(-${top}%, -${left}%)`
    };
  }

  const useStyles = makeStyles(theme => ({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #D3D3D3",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      borderRadius: "15px",
      flexGrow: 1
    },
    inputBase: {
      "&:focus ": {
        backgroundColor: "lightgrey"
      }
    }
  }));

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <div style={modalStyle} className={classes.paper}>
          <div>
            <h2>
              <IconButton style={{ float: "right" }} onClick={handleClose}>
                <Close />
              </IconButton>
              <InputBase
                id="standard-bare"
                className={classes.inputBase}
                defaultValue={data.content}
                margin="normal"
                style={{ display: "flex", justifyContent: "center" }}
                inputProps={{ "aria-label": "naked" }}
              />
            </h2>
          </div>

          <p id="simple-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p>
        </div>
      </Modal>

      <div onClick={handleOpen}>
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
