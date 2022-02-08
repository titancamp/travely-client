import logo from '../../../../assets/images/Travely.png';
import styles from './AuthInfoWrapper.module.css';

export default function AuthInfoWrapper({ children }) {
  return (
    <div className={styles.wrapper}>
      <img className={styles.logo} src={logo} alt='' />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
