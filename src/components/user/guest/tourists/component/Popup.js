import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core//DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
}));

export default function Popup(props) {
  const { children, popupState, setPopupState } = props;
  const classes = useStyles();

  return (
    <Dialog disableEnforceFocus open={popupState.isOpen}>
      <DialogTitle>
        <div>
          <Typography>{popupState.title}</Typography>

          <Button
            className={classes.closeButton}
            onClick={() => {
              setPopupState({
                ...popupState,
                isOpen: false
              });
            }}
          >
            <CloseIcon/>
          </Button>
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
}
