import React, { useCallback } from "react";
import { Close as CloseIcon, Edit as EditIcon } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ACTION_TYPES from "../../../utils/datatable-row-action-types";
import { ManageStaffContext } from "../../../store/context";

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.grey[700],
  },
}));

const ActionItem = ({ content, actionType, classes, onRowAction, rowData }) => {
  const handleButtonClick = useCallback(() => {
    onRowAction(actionType, rowData);
  }, [onRowAction, actionType, rowData]);

  return (
    <Button className={classes.button} onClick={handleButtonClick}>
      {content}
    </Button>
  );
};

const StaffActions = (props) => {
  const rowData = props.row;
  const classes = useStyles();

  return (
    <div>
      <ManageStaffContext.Consumer>
        {({ onRowAction }) => {
          return (
            <div>
              <ActionItem
                actionType={ACTION_TYPES.EDIT}
                classes={classes}
                onRowAction={onRowAction}
                rowData={rowData}
                content={<EditIcon fontSize="small" />}
              />
              <ActionItem
                actionType={ACTION_TYPES.DELETE}
                classes={classes}
                onRowAction={onRowAction}
                rowData={rowData}
                content={<CloseIcon fontSize="small" />}
              />
            </div>
          );
        }}
      </ManageStaffContext.Consumer>
    </div>
  );
};

export default StaffActions;
