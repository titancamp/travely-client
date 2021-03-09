import React from 'react';
import {
    Box,
    Button,
    FormControl,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Paper
} from '@material-ui/core';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFileOutlined';
import AttachmentIcon from '@material-ui/icons/Attachment';

import { Link } from 'react-router-dom';

import './manage-attachments.css';

function ManageAttachments({ attachments, onFileAdd, onAttachmentRemove }) {

    function handleFileChange(e) {
        const files = e.target.files;
        if (files.length) {
            onFileAdd(files[0]);
        }
    }

    return (
        <Grid container direction="column" justify="center" alignItems="stretch">
            <Grid item>
                <Box mb={1}>
                    <FormControl fullWidth>
                        <input
                            id="contained-button-file"
                            className="contained-button-file-input"
                            type="file"
                            hidden
                            onChange={handleFileChange}
                        />
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" size="small" color="default" component="span" fullWidth startIcon={<InsertDriveFileIcon />}>
                                Browse and add files
                                </Button>
                        </label>
                    </FormControl>
                </Box>
            </Grid>
            <Grid item>
                <Paper className="list-paper" variant="outlined">
                    <List dense={true}>
                        {attachments.map(item => (
                            <ListItem button key={item.name}>
                                <ListItemIcon>
                                    <AttachmentIcon fontSizeSmall />
                                </ListItemIcon>
                                <ListItemText primary={item.name} />
                                <ListItemSecondaryAction>
                                    <Link edge="end" aria-label="remove" size="small" onClick={() => onAttachmentRemove(item)}>
                                        Remove
                                            </Link>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default ManageAttachments;