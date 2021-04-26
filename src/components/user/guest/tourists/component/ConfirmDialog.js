import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(2),
    position: "absolute",
    top: theme.spacing(5),
  },
  dialogActions: {
    justifyContent: "center",
  },
}));

export default function ConfirmDialog({ title, isOpen, onConfirm, onCancel }) {
  const classes = useStyles();

  return (
    <Dialog open={isOpen} classes={{ paper: classes.dialog }}>
      <DialogContent>
        <Typography>{title}</Typography>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button variant="contained" onClick={onConfirm}>
          Yes
        </Button>
        <Button variant="contained" onClick={onCancel}>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
}
