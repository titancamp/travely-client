import { Button, Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material';

import styles from './styles.module.css';

export default function DeactivateDialog({
  open,
  userName,
  handleClose,
  handleDeactivate,
}) {
  return (
    <Dialog
      classes={{ container: styles['dialog'], paper: styles['paper'] }}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle className={styles['dialog-title']}>
        Do you want to Deactivate account ?
      </DialogTitle>
      <DialogContent>{`Are you sure you want to deactivate account ${userName} ? Users can not log in with inactive accounts.`}</DialogContent>
      <DialogActions className={styles['dialog-actions']}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          autoFocus
          variant='contained'
          onClick={() => {
            handleClose();
            handleDeactivate();
          }}
        >
          Deactivate
        </Button>
      </DialogActions>
    </Dialog>
  );
}
