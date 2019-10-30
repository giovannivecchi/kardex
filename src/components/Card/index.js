import React, { useRef, useContext } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useStyles } from "./styles";
import Modal from "@material-ui/core/Modal";
import { Container, Label } from "./styles";
import BorderContext from "../Board/context";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import TextField from "@material-ui/core/InputBase";
import Grid from "@material-ui/core/Grid";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Paper from "@material-ui/core/Paper";
import Face from "@material-ui/icons/Face";
import Button from "@material-ui/core/Button";

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

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState("Open");
  const [comments, setComments] = React.useState("Open");

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleChangeComments = comments => (event, newComments) => {
    setComments(newComments ? comments : false);
  };

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
          <Grid container spacing={3}>
            <Grid item xs={8} className={classes.teste}>
              <Paper>
                <Grid item xs={12} justify="center">
                  <TextField
                    id="standard-bare"
                    className={classes.inputBase}
                    defaultValue={data.content}
                    margin="normal"
                    style={{ display: "flex", justifyContent: "center" }}
                    inputProps={{ "aria-label": "naked" }}
                  />
                </Grid>
              </Paper>
              <Paper>
                <Grid
                  container
                  spacing={3}
                  justify="center"
                  style={{ marginTop: "3px" }}
                >
                  <Grid item xs={3}>
                    <Button textSizeLarge iconSizeSmall startIcon={<Face />}>
                      MEMBROS
                    </Button>
                  </Grid>
                  <Grid item xs={3}>
                    <Button textSizeLarge iconSizeSmall startIcon={<Face />}>
                      ETIQUETAS
                    </Button>
                  </Grid>
                  <Grid item xs={3}>
                    <Button textSizeLarge iconSizeSmall startIcon={<Face />}>
                      IDENTIFICADOR
                    </Button>
                  </Grid>
                </Grid>
              </Paper>

              <ExpansionPanel
                expanded={expanded === "Open"}
                onChange={handleChange("Open")}
              >
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>Descrição</Typography>
                </ExpansionPanelSummary>
                <Grid item xs={12} styles={{ border: 1 }}>
                  <ExpansionPanelDetails>
                    <TextField
                      defaultValue={data.descricao}
                      style={{ display: "flex", justifyContent: "center" }}
                    ></TextField>
                  </ExpansionPanelDetails>
                </Grid>
              </ExpansionPanel>
              <ExpansionPanel>
                <ExpansionPanelSummary
                  aria-controls="panel1a-content"
                  id="panelcoment"
                >
                  <Grid item xs={12} styles={{ border: 1 }}>
                    <Typography className={classes.heading}>
                      Comentarios
                    </Typography>
                  </Grid>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Grid item xs={12}>
                    <TextField
                      id="standard-bare"
                      className={classes.inputBase}
                      defaultValue={data.content}
                      margin="normal"
                      onChange={handleChangeComments("Open")}
                      style={{ display: "flex", justifyContent: "center" }}
                      inputProps={{ "aria-label": "naked" }}
                    />
                  </Grid>
                </ExpansionPanelDetails>
                <Divider />
                <ExpansionPanelActions>
                  <Grid item xs={12}>
                    <Button size="small">Cancel</Button>
                    <Button size="small" color="primary">
                      Save
                    </Button>
                  </Grid>
                </ExpansionPanelActions>
              </ExpansionPanel>
            </Grid>
            <Grid item xs={4} className={classes.teste}>
              <Grid>
                <IconButton style={{ float: "right" }} onClick={handleClose}>
                  <Close />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
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
