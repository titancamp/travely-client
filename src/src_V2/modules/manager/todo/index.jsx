import { Add } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { Dialog, Grid } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FixedSizeList as List } from 'react-window';

import { getTodosAction } from '../../../store/actions/todo.actions';
import { getTodosList } from '../../../store/selectors/todo.selectors';
import { useFilters, useToggle } from '../../../utils/hooks';
import TodoClient from '../../../utils/services/todo-client';
import styles from './styles';
import TodoFilter from './todo-filter';
import TodoForm from './todo-form';
import TodoItem from './todo-item';
import TodoListEmptyContent from './todo-list-empty-content';
import { TODO_FILTER_DEFAULT_VALUES, TaskStatus, TodoListTabs } from './utils';
import { TODOS_MOCK_DATA } from './utils/mock';

const getTodosMemoizedDependencies = (todos) => todos.map(({ status }) => status);

export default function Todo() {
  const [editableTodoId, setEditableTodoId] = useState(null);

  const { open, toggle } = useToggle();

  const dispatch = useDispatch();

  const todos = useSelector(getTodosList);

  const { filters, handleFiltersChange } = useFilters(TODO_FILTER_DEFAULT_VALUES, true);

  const getTodos = async () => {
    const data = await TodoClient.getTodos(filters);
    dispatch(getTodosAction(data));
  };

  useEffect(() => {
    getTodos();
  }, [filters.name, filters.statuses.length, filters.priorities.length]);

  const handleEdit = (id) => {
    setEditableTodoId(id);
    toggle();
  };

  const handleFormClose = () => {
    toggle();
    setEditableTodoId(null);
  };

  const data = useMemo(() => {
    let result = todos;
    if (filters.tab === TodoListTabs.TODO) {
      result = result.filter(({ status }) => status !== TaskStatus.ARCHIVED);
    } else {
      result =
        TODOS_MOCK_DATA.slice(0, 2) ||
        result.filter(({ status }) => status === TaskStatus.ARCHIVED);
    }

    return result;
  }, [filters.tab, todos.length, ...getTodosMemoizedDependencies(todos)]);

  const TODO_ITEM_SIZE = 106;

  return (
    <Box sx={styles.todo}>
      <Grid container spacing={3} sx={styles.todoContainer}>
        <Grid item>
          <Typography variant='h5'>To Do List</Typography>
        </Grid>
        <TodoFilter
          toggle={toggle}
          handleFiltersChange={handleFiltersChange}
          filters={filters}
          todoCount={todos.length}
        />
        {todos.length ? (
          <Grid item sx={styles.todoList}>
            <List itemCount={data.length} itemSize={TODO_ITEM_SIZE} height={500}>
              {({ index, style }) => (
                <div style={style}>
                  <TodoItem
                    tourLocation='Haghpat, Sanahin'
                    id={data[index].id}
                    key={data[index].id}
                    getTodos={getTodos}
                    handleEdit={handleEdit}
                  />
                </div>
              )}
            </List>
          </Grid>
        ) : (
          <Box sx={styles.emptyContainer}>
            <TodoListEmptyContent />
            <Button
              onClick={toggle}
              variant='contained'
              startIcon={<Add sx={styles.addIcon} />}
            >
              Create
            </Button>
          </Box>
        )}
      </Grid>
      <Dialog
        open={open}
        onClose={toggle}
        PaperProps={{
          sx: styles.dialogPaper,
        }}
      >
        <TodoForm onClose={handleFormClose} getTodos={getTodos} id={editableTodoId} />
      </Dialog>
    </Box>
  );
}
