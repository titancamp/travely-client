import React from "react";
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import DialogTitle from "@material-ui/core/es/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/es/DialogContent/DialogContent";
import makeStyles from "@material-ui/core/es/styles/makeStyles";
import Typography from "@material-ui/core/es/Typography/Typography";
import Controls from "./controls/Controls";
import CloseIcon from "@material-ui/icons/Close";

export default function Popup(props) {

  const useStyles = makeStyles(theme => ({
    dialogWrapper: {
      padding: theme.spacing(2),
      position: "absolute",
      top: theme.spacing(5)
    }
  }));

  const { title, children, openPopup, setOpenPopup } = props;
  const classes = useStyles();

  return (
    <Dialog disableEnforceFocus open={openPopup}>
      <DialogTitle>
        <div style={{ display: "flex" }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            {title}
          </Typography>

          <Controls.ActionButton
            color="secondary"
            onClick={() => {
              setOpenPopup(false);
            }}
          >
            <CloseIcon/>
          </Controls.ActionButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        {children}
      </DialogContent>
    </Dialog>
  );
}