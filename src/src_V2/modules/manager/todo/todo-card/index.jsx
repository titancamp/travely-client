import { Alarm, LocationOn } from '@mui/icons-material';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Popover,
  Tooltip,
  Typography,
} from '@mui/material';

import { useAnchor } from '../../../../utils/hooks';
import TaskPriorityMenu from '../task-priority-menu';
import TaskStatusMenu from '../task-status-menu';
import { mapToReminderState } from '../utils/constants';
import styles from './styles';

const TodoCard = (todo) => {
  const { open, anchorEl, handleClose, handleClick } = useAnchor();

  const { name, description, reminder, location } = todo;
  return (
    <Grid item xs={3}>
      <Card sx={styles.card}>
        <CardContent>
          <Typography varaint='body1'>{name}</Typography>
          <Box>
            <Box>
              <Typography variant='subtitle2' sx={[styles.description, styles.info]}>
                {description}
              </Typography>
              <Typography
                variant='subtitle2'
                sx={[styles.info, styles.readAll]}
                onClick={handleClick}
              >
                Read all
              </Typography>
            </Box>
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              PaperProps={{
                sx: styles.paper,
              }}
            >
              <Typography variant='subtitle2' sx={styles.info}>
                {description}
              </Typography>
            </Popover>
          </Box>
          <Grid container spacing={2} mt={0}>
            <Grid item sx={styles.iconWithInfo}>
              <Alarm sx={styles.icon} />
              <Typography variant='caption' sx={styles.info}>
                {reminder}
              </Typography>
            </Grid>
            <Grid item sx={styles.iconWithInfo}>
              <LocationOn sx={styles.icon} />
              <Typography variant='caption' sx={styles.info}>
                {location}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Grid container justifyContent='space-between'>
            <Grid item>
              <Tooltip
                title={mapToReminderState(todo.reminder)[todo.reminderStatus].tooltipText}
              >
                <IconButton>
                  {mapToReminderState(todo.reminder)[todo.reminderStatus].icon}
                </IconButton>
              </Tooltip>
              <TaskPriorityMenu todo={todo} />
            </Grid>
            <Grid item>
              <TaskStatusMenu todo={todo} />
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default TodoCard;
