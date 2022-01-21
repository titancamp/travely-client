import { Button } from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';
import styles from './styles.module.css';

export default function EditActions({
  onCancel,
  disabled,
  allowDeactivate,
  submitButtonText,
  onClickDeactivate,
}) {
  return (
    <div className={styles['actions-wrapper']}>
      <div>
        {allowDeactivate && (
          <Button
            color='error'
            variant='text'
            onClick={onClickDeactivate}
            startIcon={<BlockIcon />}
          >
            DEACTIVATE USER
          </Button>
        )}
      </div>
      <div className={styles['btns-wrapper']}>
        <Button variant='outlined' onClick={onCancel} disabled={disabled}>
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
