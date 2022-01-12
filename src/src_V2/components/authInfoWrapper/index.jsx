import styles from './styles.module.css';
import logo from '../../assets/Travely.png';

export default function AuthInfoWrapper({ ...props }) {
  return (
    <div className={styles.wrapper}>
      <img className={styles.logo} src={logo} alt='' />

      <div className={styles.content}>{props.children}</div>
    </div>
  );
}
