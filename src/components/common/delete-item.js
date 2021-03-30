import React, {useState} from 'react';
import ConfirmDialog from "../user/guest/tourists/component/ConfirmDialog";
import {Close as CloseIcon} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {ManageHotelContext} from "../../store/context";

const useStyles = makeStyles((theme) => ({
    button: {
        color: theme.palette.grey[700],
    },
}));

const DeleteItem = (props) => {
    const itemId = props.row.id;

    const [confirmDialog, setConfirmDialog] = useState({
        isOpen: false,
        title: "",
    });
    const classes = useStyles();

    const onDelete = (deleteHandler, itemId) => {
        deleteHandler(itemId);

        setConfirmDialog({
            ...confirmDialog,
            isOpen: false,
        });
    };

    return (
        <div>
            <ManageHotelContext.Consumer>
                {
                    ({deleteHandler}) => {
                        return (
                            <div>
                                <Button
                                    className={classes.button}
                                    onClick={() => {
                                        setConfirmDialog({
                                            isOpen: true,
                                            title: "Are you sure to delete this item",
                                            onConfirm: () => onDelete(deleteHandler, itemId),
                                        });
                                    }}
                                >
                                    <CloseIcon fontSize="small"/>
                                </Button>
                                <ConfirmDialog
                                    confirmDialog={confirmDialog}
                                    setConfirmDialog={setConfirmDialog}
                                />
                            </div>
                        );
                    }
                }
            </ManageHotelContext.Consumer>
        </div>
    );
};

export default DeleteItem;
