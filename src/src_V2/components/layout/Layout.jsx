import { Box } from '@mui/material';

import styles from './Layout.module.css';

export default function Layout({ children, title }) {
  return (
    <Box className={styles.mainDiv}>
      {title && <h2 className={styles.title}>{title}</h2>}
      {children}
    </Box>
  );
}
