import { Box, SvgIcon, Typography } from '@mui/material';

import { ReactComponent as EmptyContent } from '../../../../assets/empty-content.svg';
import styles from './styles';

const TodoListEmptyContent = () => (
  <Box sx={styles.todoEmptyContainer}>
    <SvgIcon component={EmptyContent} viewBox='0 0 47 36' sx={styles.emptyContent} />
    <Typography>You don’t have to do list yet.</Typography>
  </Box>
);

export default TodoListEmptyContent;
