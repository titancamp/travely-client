import { Clear, FilterAlt, ViewColumn } from '@mui/icons-material';
import { Box, Button, IconButton, InputBase, Paper } from '@mui/material';

import styles from './ControlPanel.module.css';

export default function ControlPanel({ searchValue, setSearchTxt }) {
  return (
    <Box className={styles.mainDiv}>
      <Paper className={styles.searchDiv}>
        <InputBase
          name='search'
          className={styles.searchInput}
          placeholder='Search by Tour Name/ID/Supplier'
          value={searchValue}
          onChange={(e) => setSearchTxt(e.target.value)}
        />
        {!!searchValue && (
          <IconButton onClick={() => setSearchTxt('')}>
            <Clear />
          </IconButton>
        )}
      </Paper>

      <Box className={styles.filterDiv}>
        <Button variant='outlined' startIcon={<FilterAlt />}>
          Filter
        </Button>
      </Box>

      <Box className={styles.optionsDiv}>
        <Button variant='outlined' startIcon={<ViewColumn />}>
          Column option
        </Button>
      </Box>
    </Box>
  );
}
