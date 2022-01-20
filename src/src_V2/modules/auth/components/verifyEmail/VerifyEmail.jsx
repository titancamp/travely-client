import clsx from 'clsx';
import { Divider, Link, Typography } from '@mui/material';
import { format } from 'date-fns';

import AuthInfoWrapper from '../authInfoWrapper/AuthInfoWrapper';

import { useTimer } from '../../../../utils/hooks';
import styles from './VerifyEmail.module.css';
import verifyIllustration from '../../../../assets/verifyIllustration.svg';

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
            <span className={styles.counter}>
              {format(secondsRemain * 1000, 'mm:ss')}
            </span>
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
