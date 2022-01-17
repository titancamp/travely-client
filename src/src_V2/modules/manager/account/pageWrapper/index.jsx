import clsx from 'clsx';
import styles from './styles.module.css';

export default function PageWrapper({ actionsVisible, children }) {
  return (
    <div
      className={clsx(styles['wrapper'], {
        [styles['wrapper-with-actions']]: actionsVisible,
      })}
    >
      {children}
    </div>
  );
}
