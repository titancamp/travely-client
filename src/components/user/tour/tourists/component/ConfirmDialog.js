import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({

  dialog: {
    padding: theme.spacing(2),
    position: "absolute",
    top: theme.spacing(5)
  },
  dialogActions: {
    justifyContent: "center"
  }
}));

export default function ConfirmDialog(props) {

  const { confirmDialog, setConfirmDialog } = props;
  const classes = useStyles();
  const isConfirm = () => setConfirmDialog({ ...confirmDialog, isOpen: false });

  return (
    <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
      <DialogContent>
        <Typography>
          {confirmDialog.title}
        </Typography>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button variant="contained"
                onClick={confirmDialog.onConfirm}>Yes

        </Button>
        <Button variant="contained"
                onClick={isConfirm}>No

        </Button>

      </DialogActions>
    </Dialog>
  );
}