import { Close, Delete, Edit } from '@mui/icons-material';
import { Button, Dialog, DialogTitle, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

import styles from './style.module.css';

export const BootstrapDialog = styled(Dialog)(({ styles }) => {
  return styles;
});

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
