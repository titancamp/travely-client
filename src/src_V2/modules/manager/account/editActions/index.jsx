import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import styles from './styles.module.css';
import { ROUTES } from '../../routes';

export default function EditActions() {
  const navigate = useNavigate();

  return (
    <>
      <Box flexGrow={1}></Box>
      <div className={styles['btns-wrapper']}>
        <Button variant='outlined' onClick={() => navigate('/' + ROUTES.DASHBOARD)}>
          Cancel
        </Button>
        <Button className={styles['submit-btn']} type='submit' variant='contained'>
          Save Changes
        </Button>
      </div>
    </>
  );
}
