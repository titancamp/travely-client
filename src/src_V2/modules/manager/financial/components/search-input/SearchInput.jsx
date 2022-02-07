import { Clear } from '@mui/icons-material';
import { Box, IconButton, InputBase } from '@mui/material';

import styles from './SearchInput.module.css';

export default function SearchInput({ value, label = 'Search', searchHandler }) {
  return (
    <Box className={styles.searchDiv}>
      <InputBase
        name='search'
        className={styles.searchInput}
        placeholder={label}
        value={value}
        onChange={(e) => searchHandler(e.target.value)}
      />
      {!!value && (
        <IconButton onClick={() => searchHandler('')}>
          <Clear />
        </IconButton>
      )}
    </Box>
  );
}
