import { useCallback, useEffect, useState } from 'react';

import { Box, Typography, IconButton, DialogTitle, DialogContent } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

import styles from './style.module.css';

export default function ViewRoomDialog({ id, onShowHideDialog }) {
  const [room, setRoom] = useState({});
  const openDialog = useCallback(
    (mode) => {
      //TODO handle in another way
      onShowHideDialog({
        id,
        mode,
        open: true,
      });
    },
    [id, onShowHideDialog]
  );

  function getRoomInfo() {
    console.log(id);

    /**
     * Temporary get from backend.
     */
    setRoom({
      id: 1,
      beds: 2,
      quantity: 12,
      price: 30000,
      type: 'Standard Single',
    });
  }

  useEffect(getRoomInfo, [id]);

  //TODO handle N/A cases and styles
  return (
    <>
      <DialogTitle>
        <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h5">{room.type} / Details</Typography>
          <Box className={`${styles.cardActions} ${styles.rightAligned}`}>
            <IconButton onClick={() => openDialog('edit')}>
              <Edit />
            </IconButton>
            <IconButton color="primary" onClick={() => openDialog('delete')}>
              <Delete />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box
          style={{
            width: 500,
          }}
        >
          <Box style={{ display: 'flex' }}>
            <Box>
              <h6>Type</h6>
              <p>{room.type}</p>
            </Box>
            <Box>
              <h6>Quantity</h6>
              <p>{room.quantity}</p>
            </Box>
            <Box>
              <h6>Price</h6>
              <p>{room.price}</p>
            </Box>
          </Box>
          <Box style={{ display: 'flex' }}>
            <Box>
              <h6>Number of Beds</h6>
              <p>{room.beds}</p>
            </Box>
            <Box>
              <h6>Additional beds</h6>
              <p>{room.beds}</p>
            </Box>
          </Box>
          <Box>
            <h6>Services</h6>
            <p>Services/ Services/ Services/ Services/ Services/ </p>
          </Box>
        </Box>
      </DialogContent>
    </>
  );
}
