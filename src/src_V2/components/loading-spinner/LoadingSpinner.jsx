import styles from './LoadingSpinner.module.css';

export default function LoadingSpinner() {
  return (
    <div className={styles.spinnerDiv}>
      <div className={styles.spinnerSubDiv}>
        <div></div>
      </div>
    </div>
  );
}
