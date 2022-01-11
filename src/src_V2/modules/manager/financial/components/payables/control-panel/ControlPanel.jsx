import { Box, Button, InputBase, Paper } from '@mui/material';
import { FilterAlt, ViewColumn } from '@mui/icons-material';

import styles from './ControlPanel.module.css';

export default function ControlPanel({ searchTxt, searchTxtChangedHandler }) {
  return (
    <Box className={styles.mainDiv}>
      <Paper className={styles.searchDiv}>
        <InputBase
          className={styles.searchInput}
          placeholder="Search by Tour Name/ID/Supplier"
          value={searchTxt}
          onChange={(e) => searchTxtChangedHandler(e.target.value)}
        />
      </Paper>

      <Box className={styles.filterDiv}>
        <Button variant="outlined" startIcon={<FilterAlt />}>
          Filter
        </Button>
      </Box>

      <Box className={styles.optionsDiv}>
        <Button variant="outlined" startIcon={<ViewColumn />}>
          Column option
        </Button>
      </Box>
    </Box>
  );
}
