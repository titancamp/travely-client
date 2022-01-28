import { Box, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { useDispatch } from 'react-redux';

import TodoClient from '../../../../services/todo-client';
import { updateTodo } from '../../../../store/actions/todo.actions';
import { useAnchor } from '../../../../utils/hooks';
import { TaskPriority } from '../utils';
import styles from './styles';

const mapToPriority = {
  [TaskPriority.LOW]: {
    color: 'warning.main',
    tooltipText: 'Low priority',
  },
  [TaskPriority.MEDIUM]: {
    color: 'success.main',
    tooltipText: 'Medium priority',
  },
  [TaskPriority.HIGH]: {
    color: 'error.main',
    tooltipText: 'High priority',
  },
};

const TaskPriorityMenu = ({ todo }) => {
  const { handleClick, anchorEl, open, handleClose } = useAnchor();

  const dispatch = useDispatch();
  const { color, tooltipText } = mapToPriority[todo.priority];

  const handlePriorityChange = async (value) => {
    await TodoClient.updateTodo({
      ...todo,
      priority: value,
    });
    const response = await TodoClient.getTodoById(todo.id);
    dispatch(updateTodo(response));
  };

  return (
    <>
      <Tooltip title={tooltipText}>
        <IconButton onClick={handleClick}>
          <Box sx={styles.statusIcon(color)} />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{ sx: styles.menuPaper }}
        MenuListProps={{ sx: styles.menuList }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem
          sx={styles.menuItem}
          onClick={() => handlePriorityChange(TaskPriority.HIGH)}
          selected={todo.priority === TaskPriority.HIGH}
        >
          High
        </MenuItem>
        <MenuItem
          sx={styles.menuItem}
          onClick={() => handlePriorityChange(TaskPriority.MEDIUM)}
          selected={todo.priority === TaskPriority.MEDIUM}
        >
          Medium
        </MenuItem>
        <MenuItem
          sx={styles.menuItem}
          onClick={() => handlePriorityChange(TaskPriority.LOW)}
          selected={todo.priority === TaskPriority.LOW}
        >
          Low
        </MenuItem>
      </Menu>
    </>
  );
};

export default TaskPriorityMenu;
