import styles from './authPageWrapper.module.css';
import logo from '../../assets/Travely.png';
import loginIllustration from '../../assets/login_illustration.svg';
import { Typography } from '@mui/material';

const authPageWrapper = (props) => {
  return (
    <div className={styles.authWrapper}>
      <div className={styles.illustrationWrapper}>
        <div className={styles.logo}>
          <img className={styles.img} src={logo} alt='' />
        </div>
        <img className={styles.illustration} src={loginIllustration} alt='' />
      </div>
      <div className={styles.mainWrapper}>
        <div className={styles.titleWrapper}>
          <Typography variant='h4' color='primary'>
            {props.title}
          </Typography>
          {props.description && (
            <Typography className={styles.description} variant='body1'>
              {props.description}
            </Typography>
          )}
        </div>
        <div className={styles.formWrapper}>{props.children}</div>
      </div>
    </div>
  );
};

export default authPageWrapper;
