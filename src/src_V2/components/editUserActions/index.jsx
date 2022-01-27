import { Button } from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';

import styles from './styles.module.css';

export default function EditUserActions({
  onCancel,
  disabled,
  allowDeactivate,
  submitButtonText,
  toggleDialog,
}) {
  return (
    <div className={styles['actions-wrapper']}>
      <div>
        {allowDeactivate && (
          <Button
            color='error'
            variant='text'
            onClick={() => toggleDialog(false)}
            startIcon={<BlockIcon />}
          >
            DEACTIVATE USER
          </Button>
        )}
      </div>
      <div className={styles['btns-wrapper']}>
        <Button variant='outlined' onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type='submit'
          variant='contained'
          disabled={disabled}
          className={styles['submit-btn']}
        >
          {submitButtonText || 'Save Changes'}
        </Button>
      </div>
    </div>
  );
}
