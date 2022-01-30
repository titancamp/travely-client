import { FilterAlt } from '@mui/icons-material';
import { Box, Button } from '@mui/material';

import SearchInput from '../../components/search-input/SearchInput';
import styles from './ControlPanel.module.css';

export default function ControlPanel({ searchValue, handleSearchChange }) {
  return (
    <Box className={styles.mainDiv}>
      <Box className={styles.search}>
        <SearchInput
          searchValue={searchValue}
          searchHandler={handleSearchChange}
          searchLbl='Search by Tour Name/ID/Supplier'
        />
      </Box>

      <Box className={styles.filterDiv}>
        <Button variant='outlined' startIcon={<FilterAlt />}>
          Filter
        </Button>
      </Box>

      {/*<Box className={styles.optionsDiv}>*/}
      {/*  <Button variant='outlined' startIcon={<ViewColumn />}>*/}
      {/*    Column option*/}
      {/*  </Button>*/}
      {/*</Box>*/}
    </Box>
  );
}
