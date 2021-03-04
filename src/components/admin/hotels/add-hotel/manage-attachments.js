import React from 'react';
import {
    Avatar,
    Button,
    FormControl,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Paper
} from '@material-ui/core';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFileOutlined';
import AttachmentIcon from '@material-ui/icons/Attachment';

import './manage-attachments.css';

function ManageAttachments({ attachments, onFileAdd, onAttachmentRemove }) {

    function handleFileChange(e) {
        const files = e.target.files;
        if (files.length) {
            onFileAdd(files[0]);
        }
    }

    return (
        <div>
            <FormControl fullWidth>
                <input
                    className="contained-button-file-input"
                    id="contained-button-file"
                    type="file"
                    onChange={handleFileChange}
                />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" color="default" component="span" fullWidth startIcon={<InsertDriveFileIcon />}>
                        Browse and add files
                </Button>
                </label>
            </FormControl>
            <Paper className="list-paper">
                <List>
                    {attachments.map(item => (
                        <ListItem button key={item.name}>
                            <ListItemAvatar>
                                <Avatar>
                                    <AttachmentIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={item.name} />
                            <ListItemSecondaryAction>
                                <Button edge="end" aria-label="remove" size="small" onClick={() => onAttachmentRemove(item)}>
                                    Remove
                            </Button>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </div>
    );
}

export default ManageAttachments;