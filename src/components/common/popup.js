import React from 'react';
import {Dialog, DialogTitle, DialogContent} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import {CloseIcon} from "@material-ui/data-grid";

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
}));


export default function Popup(props) {
    const {title, children, openPopup, setOpenPopup} = props;
    const classes = useStyles();

    return (
        <Dialog
            open={openPopup}
            fullWidth
            classes={{paper: classes.dialogWrapper}}
        >
            <DialogTitle>
                <div>
                    <Typography variant="h6" component="div">
                        {title}
                    </Typography>
                    <IconButton
                        aria-label="close"
                        className={classes.closeButton}
                        onClick={() => setOpenPopup(false)}
                    >
                        <CloseIcon/>
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    );
}