import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { Button, Badge } from "@material-ui/core";
import { FaHeart } from "react-icons/fa";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  btn: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "transparent",
      boxShadow: "none",
    },
    boxShadow: "none",
    fontWeight: "10px !important",
  },
  labelBtn: {
    fontSize: "14px !important",
  },
}));

export default function Favorites() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Badge color="secondary" badgeContent={0}>
        <Button
          classes={{
            label: classes.labelBtn,
          }}
          className={classes.btn}
          variant="contained"
          onClick={handleClickOpen}
        >
          <FaHeart style={{ marginRight: "8px" }} />
          favorites
        </Button>
      </Badge>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        maxWidth="md"
        fullWidth={true}
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"FAVORITES MOVIES"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Under construction...
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
