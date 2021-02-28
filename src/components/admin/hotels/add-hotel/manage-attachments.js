import React from 'react';
import {
    Input,
    Button,
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    ListItemSecondaryAction,
} from '@material-ui/core';
import AttachmentIcon from '@material-ui/icons/Attachment';

function ManageAttachments({ attachments, style, onAttachmentAdd, onAttachmentRemove }) {
    const canAdd = !!onAttachmentAdd;
    const canRemove = !!onAttachmentRemove;

    return (
        <>
            {
                canAdd && <Input
                    type="file"
                    className="btn-upload"
                    color="primary"
                    variant="contained"
                    component="span"
                    onChange={onAttachmentAdd}>
                    Browse and add files
                </Input>
            }
            <List>
                {attachments.map(item => (
                    <ListItem button style={style} key={item.id}>
                        <ListItemAvatar>
                            <Avatar>
                                <AttachmentIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={item.name} />
                        {
                            canRemove && <ListItemSecondaryAction>
                                <Button edge="end" aria-label="remove" size="small"
                                    onClick={() => onAttachmentRemove(item.id)}>
                                    Remove
                            </Button>
                            </ListItemSecondaryAction>
                        }
                    </ListItem>
                ))}
            </List>
        </>
    );
}

export default ManageAttachments;
