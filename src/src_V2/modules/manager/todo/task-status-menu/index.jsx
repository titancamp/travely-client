import { KeyboardArrowDown } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Menu,
  MenuItem,
} from '@mui/material';
import { useDispatch } from 'react-redux';

import { useAnchor, useToggle } from '../../../../utils/hooks';
import TodoClient from '../../../../services/todo-client';
import { updateTodo } from '../../../../store/actions/todo.actions';
import { TaskStatus } from '../utils';
import styles from './styles';

const mapToStatus = {
  [TaskStatus.TODO]: {
    color: 'primary',
    title: 'To-do',
  },
  [TaskStatus.IN_PROGRESS]: {
    color: 'warning',
    title: 'In Progress',
  },
  [TaskStatus.DONE]: {
    color: 'success',
    title: 'Done',
  },
};

const TaskStatusMenu = ({ todo, getTodos }) => {
  const { handleClick, anchorEl, open, handleClose } = useAnchor();
  const { open: dialogOpen, toggle } = useToggle();

  const dispatch = useDispatch();

  const handleTaskStatusChange = async (status) => {
    await TodoClient.updateTodo({
      ...todo,
      status,
    });
    const response = await TodoClient.getTodoById(todo.id);
    dispatch(updateTodo(response));
  };

  const handleArchivedClick = async () => {
    await handleTaskStatusChange(TaskStatus.ARCHIVED);
    toggle();
    getTodos();
  };

  return (
    <>
      <Button
        variant='outlined'
        sx={styles.taskStatus}
        endIcon={<KeyboardArrowDown />}
        color={mapToStatus[todo.status].color}
        onClick={handleClick}
      >
        {mapToStatus[todo.status].title}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: styles.menuPaper,
        }}
        MenuListProps={{
          sx: styles.menuList,
        }}
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
          selected={todo.status === TaskStatus.TODO}
          onClick={() => handleTaskStatusChange(TaskStatus.TODO)}
        >
          To-Do
        </MenuItem>
        <MenuItem
          sx={styles.menuItem}
          selected={todo.status === TaskStatus.IN_PROGRESS}
          onClick={() => handleTaskStatusChange(TaskStatus.IN_PROGRESS)}
        >
          In Progress
        </MenuItem>
        <MenuItem
          sx={styles.menuItem}
          selected={todo.status === TaskStatus.DONE}
          onClick={() => handleTaskStatusChange(TaskStatus.DONE)}
        >
          Done
        </MenuItem>
        <MenuItem
          sx={styles.menuItem}
          selected={todo.status === TaskStatus.ARCHIVED}
          onClick={() => {
            toggle();
            handleClose();
          }}
        >
          Archive
        </MenuItem>
      </Menu>
      <Dialog open={dialogOpen} onClose={toggle}>
        <DialogContent>
          <DialogContentText>
            Archiving an item will move it to Archive section and cancel the pending
            reminder notification.
          </DialogContentText>
          <DialogActions>
            <Button onClick={toggle}>Cancel</Button>
            <Button onClick={handleArchivedClick}>Archive</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TaskStatusMenu;
