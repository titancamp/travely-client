import React, { useCallback } from "react";
import {
  Link,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import AttachmentIcon from "@material-ui/icons/Attachment";

function AttachmentListItem({ attachment, onAttachmentRemove }) {
  const handleAttachmentRemove = useCallback(
    () => onAttachmentRemove(attachment),
    [onAttachmentRemove, attachment]
  );

  return (
    <ListItem button key={attachment.name}>
      <ListItemIcon>
        <AttachmentIcon fontSizeSmall />
      </ListItemIcon>
      <ListItemText primary={attachment.name} />
      <ListItemSecondaryAction>
        <Link
          component="button"
          variant="body2"
          onClick={handleAttachmentRemove}
        >
          Remove
        </Link>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default AttachmentListItem;
