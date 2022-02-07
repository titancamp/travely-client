import { CircularProgress, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import congratsIllustration from '../../../../assets/illustrations/congratsIllustration.svg';
import { ROUTES } from '../../routes';
import AuthInfoWrapper from '../authInfoWrapper/AuthInfoWrapper';
import styles from './Congratulations.module.css';

export default function Congratulations({ urlToRedirect, timeout }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchParams.get('token')) {
      navigate(`/${ROUTES.LOGIN}`, { replace: true });
    } else {
      setTimeout(() => navigate(urlToRedirect, { replace: true }), timeout);
    }
  }, []);

  return (
    <AuthInfoWrapper>
      <div className={styles.content}>
        <img src={congratsIllustration} alt='' className={styles.illustration} />
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
