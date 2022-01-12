import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../manager/routes';
import AuthInfoWrapper from '../../../components/authInfoWrapper';
import congratsIllusration from '../../../assets/congratsIllustration.svg';
import styles from './styles.module.css';
import { CircularProgress, Typography } from '@mui/material';
import { useEffect } from 'react';

export default function Congratulations() {
  const params = new URLSearchParams(location.search);
  let navigate = useNavigate();

  useEffect(() => {
    if (!params.get('token')) {
      navigate('/login', { replace: true });
    } else {
      setTimeout(() => navigate('/' + ROUTES.DASHBOARD, { replace: true }), 2000);
    }
  }, []);

  return (
    <AuthInfoWrapper>
      <div className={styles.content}>
        <img src={congratsIllusration} alt='' className={styles.illustration} />
        <Typography variant='h4' className={styles.title}>
          Congratulations!
        </Typography>
        <Typography variant='body2' color='textSecondary' className={styles.subtitle}>
          You have successfully registered.
        </Typography>
        <div>
          <CircularProgress className={styles.progress} />
          <Typography variant='body2'>Loading ...</Typography>
        </div>
      </div>
    </AuthInfoWrapper>
  );
}
