import { Clear } from '@mui/icons-material';
import { Box, IconButton, InputBase } from '@mui/material';

import styles from './SearchInput.module.css';

export default function SearchInput({
  searchValue,
  searchHandler,
  searchLbl = 'Search',
}) {
  return (
    <Box className={styles.searchDiv}>
      <InputBase
        name='search'
        className={styles.searchInput}
        placeholder={searchLbl}
        value={searchValue}
        onChange={(e) => searchHandler(e.target.value)}
      />
      {!!searchValue && (
        <IconButton onClick={() => searchHandler('')}>
          <Clear />
        </IconButton>
      )}
    </Box>
  );
}
