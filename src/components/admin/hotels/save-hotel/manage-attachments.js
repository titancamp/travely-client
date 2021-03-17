import React, { useCallback } from 'react';
import {
    Box,
    Button,
    FormControl,
    Grid,
    List,
    Paper
} from '@material-ui/core';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFileOutlined';
import AttachmentListItem from './attachment-list-item';

function ManageAttachments({ attachments, onFileAdd, onAttachmentRemove }) {

    const handleFileChange = useCallback(
        (e) => {
            const files = e.target.files;
            if (files.length) {
                onFileAdd(files[0]);
            }
        },
        [onFileAdd]
    );

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
                            <AttachmentListItem attachment={item} onAttachmentRemove={onAttachmentRemove} />
                        ))}
                    </List>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default ManageAttachments;