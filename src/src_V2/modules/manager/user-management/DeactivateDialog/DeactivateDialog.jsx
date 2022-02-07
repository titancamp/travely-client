import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

import styles from './styles.module.css';

export default function DeactivateDialog({
  open,
  userName,
  toggleDialog,
  handleDeactivate,
}) {
  const deactivateAndClose = () => {
    handleDeactivate();
    toggleDialog(false);
  };

  return (
    <Dialog
      classes={{ container: styles['dialog'], paper: styles['paper'] }}
      open={open}
      onClose={() => toggleDialog(false)}
    >
      <DialogTitle className={styles['dialog-title']}>
        Do you want to Deactivate account ?
      </DialogTitle>
      <DialogContent>{`Are you sure you want to deactivate account ${userName} ? Users can not log in with inactive accounts.`}</DialogContent>
      <DialogActions className={styles['dialog-actions']}>
        <Button onClick={() => toggleDialog(false)}>Cancel</Button>
        <Button autoFocus variant='contained' onClick={deactivateAndClose}>
          Deactivate
        </Button>
      </DialogActions>
    </Dialog>
  );
}
