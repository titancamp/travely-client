import styles from './LoadingSpinner.module.css';

export default function LoadingSpinner() {
  return (
    <div className={styles.preloader}>
      <div className={styles.loader} />
    </div>
  );
}
