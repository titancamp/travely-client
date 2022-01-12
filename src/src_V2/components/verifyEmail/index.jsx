import { Divider, Link, Typography } from '@mui/material';
import clsx from 'clsx';
import styles from './styles.module.css';
import useTimer from '../../hooks/useTimer';
import verifyIllustration from '../../assets/verifyIllustration.svg';
import logo from '../../assets/Travely.png';

// Temporary fix, no date formatting utils
const addZero = (num) => (num > 10 ? num : '0' + num);

export default function VerifyEmail(props) {
  const [secondsRemain, resetTimer] = useTimer(59);

  return (
    <div className={styles.wrapper}>
      <img className={styles.logo} src={logo} alt='' />

      <div className={styles.content}>
        <img src={verifyIllustration} alt='' className={styles.illustration} />
        <Typography variant='h4' className={styles.title}>
          Verify Your Email Address
        </Typography>
        <Typography variant='subtitle1'>
          Please check your <b>{props.email}</b> email inbox for a verification email.
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
          <Link underline='none' className={styles.link} onClick={props.onGoBack}>
            Change
          </Link>
        </Typography>
      </div>
    </div>
  );
}
