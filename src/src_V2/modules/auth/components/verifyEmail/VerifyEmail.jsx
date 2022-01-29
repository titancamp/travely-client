import { Divider, Link, Typography } from '@mui/material';
import clsx from 'clsx';

import verifyIllustration from '../../../../assets/verifyIllustration.svg';
import { useTimer } from '../../../../utils/hooks';
import AuthInfoWrapper from '../authInfoWrapper/AuthInfoWrapper';
import styles from './VerifyEmail.module.css';

// Temporary fix, no date formatting utils
const addZero = (num) => (num > 10 ? num : '0' + num);

export default function VerifyEmail({ email, onGoBack }) {
  const [secondsRemain, resetTimer] = useTimer(59);

  return (
    <AuthInfoWrapper>
      <div className={styles.content}>
        <img src={verifyIllustration} alt='' className={styles.illustration} />
        <Typography variant='h4' className={styles.title}>
          Verify Your Email Address
        </Typography>
        <Typography variant='subtitle1'>
          Please check your <b>{email}</b> email inbox for a verification email.
        </Typography>
        <Typography variant='subtitle1'>
          Didn&apos;t receive an email?{' '}
          <Link
            className={clsx({
              [styles.link]: true,
              [styles.disabledLink]: secondsRemain > 0,
            })}
            onClick={() => {
              resetTimer();
            }}
          >
            Resend email.
          </Link>{' '}
          {secondsRemain > 0 && (
            <span className={styles.counter}>{'00:' + addZero(secondsRemain)}</span>
          )}
        </Typography>
        <Divider className={styles.divider} />
        <Typography variant='body2'>
          Wrong email?{' '}
          <Link underline='none' className={styles.link} onClick={onGoBack}>
            Change
          </Link>
        </Typography>
      </div>
    </AuthInfoWrapper>
  );
}
