import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Typography } from '@mui/material';

import AuthInfoWrapper from '../authInfoWrapper';

import styles from './styles.module.css';
import congratsIllusration from '../../assets/congratsIllustration.svg';

export default function Congratulations({ urlToRedirect, timeout }) {
  const params = new URLSearchParams(location.search);
  let navigate = useNavigate();

  useEffect(() => {
    if (!params.get('token')) {
      navigate('/login', { replace: true });
    } else {
      setTimeout(() => navigate(urlToRedirect, { replace: true }), timeout);
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
