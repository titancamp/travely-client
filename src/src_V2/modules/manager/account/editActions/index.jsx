import { Button, Typography } from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';
import styles from './styles.module.css';

export default function EditActions({ allowDeactivate, onCancel, submitButtonText }) {
  return (
    <div className={styles['actions-wrapper']}>
      <div className={styles['deactivate']}>
        {allowDeactivate && (
          <>
            <BlockIcon />
            <Typography>DEACTIVATE USER</Typography>
          </>
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
