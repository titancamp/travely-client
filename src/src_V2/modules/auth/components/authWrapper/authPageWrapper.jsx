import { Typography } from '@mui/material';

import logo from '../../../../assets/images/Travely.png';
import loginIllustration from '../../../../assets/login_illustration.svg';
import styles from './authPageWrapper.module.css';

const authPageWrapper = ({ title, description, children }) => {
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
            {title}
          </Typography>
          {description && (
            <Typography className={styles.description} variant='body1'>
              {description}
            </Typography>
          )}
        </div>
        <div className={styles.formWrapper}>{children}</div>
      </div>
    </div>
  );
};

export default authPageWrapper;
