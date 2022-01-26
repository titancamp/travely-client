import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Close, Delete, Edit } from '@mui/icons-material';
import { Button, Dialog, DialogTitle, IconButton } from '@mui/material';
import styles from '../../food/dialogs/style.module.css';

/*TODO see if we can merge this with BootstrapDialog in
AllFilter file, otherwise get this out from components folder*/

export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    position: 'absolute',
    top: 10,
    right: 10,
    margin: 'inherit',
    maxWidth: 900,
    width: 900,
    height: 1180,
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export const BootstrapDialogTitle = (props) => {
  const { children, onClose, handleReset, ...other } = props;

  //TODO remove inline styles
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <div>
          {handleReset ? (
            <div className={styles.filterHeader}>
              <Button className={styles.resetBtn} onClick={handleReset}>
                RESET
              </Button>
            </div>
          ) : (
            <>
              <Edit className={styles.headerActions} />
              <Delete className={`${styles.headerDeleteBtn} ${styles.headerActions}`} />
            </>
          )}
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
            <Close />
          </IconButton>
        </div>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
  handleReset: PropTypes.func,
};
