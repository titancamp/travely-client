import { Button } from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';
import styles from './styles.module.css';

export default function EditActions({
  onCancel,
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
        <Button variant='outlined' onClick={onCancel}>
          Cancel
        </Button>
        <Button className={styles['submit-btn']} type='submit' variant='contained'>
          {submitButtonText || 'Save Changes'}
        </Button>
      </div>
    </div>
  );
}
