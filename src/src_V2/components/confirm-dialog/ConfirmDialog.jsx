import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function ConfirmDialog({
  open = false,
  title = '',
  message = '',
  confirmButton,
  cancelButton,
  onClose,
  onCancel,
  onConfirm,
}) {
  const confirmBtn = {
    variant: 'contained',
    txt: 'Confirm',
    focus: true,
    ...confirmButton,
  };

  const cancelBtn = {
    variant: 'outlined',
    txt: 'Cancel',
    ...cancelButton,
  };

  const cancelHandler = onCancel ? onCancel : onClose;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        {title}
        {onClose && (
          <IconButton
            aria-label='close'
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={cancelHandler}
          autoFocus={!confirmBtn.focus}
          variant={cancelBtn.variant}
        >
          {cancelBtn.txt}
        </Button>
        <Button
          onClick={onConfirm}
          autoFocus={confirmBtn.focus}
          variant={confirmBtn.variant}
        >
          {confirmBtn.txt}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
