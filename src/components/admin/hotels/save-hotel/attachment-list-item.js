import React, { useCallback } from "react";
import {
  Box,
  Link,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import AttachmentIcon from "@material-ui/icons/Attachment";
import { downloadFile } from "../../../../utility";
const FILE_SERVICE_URL = process.env.REACT_APP_FILE_SERVICE_URL;

function AttachmentListItem({ attachment, onAttachmentRemove }) {
  const handleAttachmentRemove = useCallback(
    () => onAttachmentRemove(attachment),
    [onAttachmentRemove, attachment]
  );
  const handleAttachmentDownload = useCallback(
    () => {
      const fileId = attachment.fileId;
      if (fileId) {
        const agencyId = localStorage.getItem("agencyId");
        const fileUrl = `${FILE_SERVICE_URL}/api/File/Download?fileId=${fileId}&companyId=${agencyId}`;
        downloadFile(fileUrl);
      }
    },
    [attachment]
  );

  return (
    <ListItem button key={attachment.name}>
      <ListItemIcon>
        <AttachmentIcon fontSizeSmall />
      </ListItemIcon>
      <ListItemText primary={attachment.name} />
      <ListItemSecondaryAction>
        {attachment.fileId
          ? <Box>
              <Link component="button"
                variant="body2"
                onClick={handleAttachmentDownload}
                >
                  Download
              </Link>
            </Box>
          : null}
        <Box>
          <Link
            component="button"
            variant="body2"
            onClick={handleAttachmentRemove}
          >
            Remove
          </Link>
        </Box>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default AttachmentListItem;
