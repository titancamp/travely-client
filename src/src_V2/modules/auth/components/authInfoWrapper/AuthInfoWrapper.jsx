import styles from './AuthInfoWrapper.module.css';
import logo from '../../../../assets/Travely.png';

export default function AuthInfoWrapper({ children }) {
  return (
    <div className={styles.wrapper}>
      <img className={styles.logo} src={logo} alt='' />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
