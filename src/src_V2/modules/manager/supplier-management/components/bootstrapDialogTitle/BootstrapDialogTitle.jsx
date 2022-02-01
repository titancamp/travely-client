import { Close, Delete, Edit } from '@mui/icons-material';
import { Button, Dialog, DialogTitle, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

import styles from './style.module.css';

/*TODO see if we can merge this with BootstrapDialog in
AllFilter file, otherwise get this out from components folder*/

export const BootstrapDialog = styled(Dialog)(() => ({
  '& .MuiDialog-paper': {
    position: 'absolute',
    top: 80,
    right: 0,
    margin: 'inherit',
    maxWidth: 900,
    width: 900,
    height: 1180,
  },
}));

export const BootstrapDialogTitle = (props) => {
  const { children, onClose, handleReset, ...other } = props;

  return (
    <DialogTitle {...other}>
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
            onClick={onClose}
            className={`${styles.iconButton} ${handleReset ? styles.filtersModal : ''}`}
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
