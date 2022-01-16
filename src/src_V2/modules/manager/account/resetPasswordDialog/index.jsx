import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';

import styles from './styles.module.css';

export default function ResetPasswordDialog({ handleClose, open }) {
  return (
    <Dialog
      classes={{ container: styles['dialog'], paper: styles['paper'] }}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle className={styles['dialog-title']}>Change password</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='normal'
          label='Current Password'
          type='password'
          fullWidth
        />
        <TextField
          autoFocus
          margin='normal'
          label='New Password'
          type='password'
          fullWidth
        />
        <TextField
          autoFocus
          margin='normal'
          label='Confirm Password'
          type='password'
          fullWidth
        />
      </DialogContent>
      <DialogActions className={styles['dialog-actions']}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose} variant='contained' disableElevation>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
