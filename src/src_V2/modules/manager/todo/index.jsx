import {
    useEffect,
    useMemo,
    useState
} from 'react';
import { Container } from '../../../components';
import { FixedSizeList as List } from 'react-window';

import { Typography } from '@mui/material';
import { managerSidebarConfig } from '../config';
import {
    Dialog,
    Grid,
} from '@mui/material';

import TodoItem from './TodoItem';
import TodoClient from '../../../../api/todo-client';
import { useToggle } from '../../global/hooks';
import TodoForm from './TodoForm';
import TodoFilter from './TodoFilter';
import {
    useDispatch,
    useSelector
} from 'react-redux';
import { getTodosAction } from '../../../store/actions/todo.actions';
import { getTodosList } from '../../../store/selectors/todo.selectors';
import { useFilters } from '../../global';
import {
    TaskStatus,
    TODO_FILTER_DEFAULT_VALUES,
    TodoListTabs
} from './utils';

const getTodosMemoizedDependencies = (todos) => todos.map(({ status }) => status);

export default function Todo() {
    const [editableTodoId, setEditableTodoId] = useState(null);

    const { open, toggle } = useToggle();

    const dispatch = useDispatch();

    const todos = useSelector(getTodosList);

    const {
        filters,
        handleFiltersChange,
    } = useFilters(TODO_FILTER_DEFAULT_VALUES, true);

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
        }  else {
            result = result.filter(({ status }) => status === TaskStatus.ARCHIVED);
        }

        return result;
    }, [filters.tab, todos.length, ...getTodosMemoizedDependencies(todos)]);

    const TODO_ITEM_SIZE = 106;

    return (
        <Container managerSidebarConfig={managerSidebarConfig}>
            <Grid
                container
                direction='column'
                spacing={3}
                pr={3}
                ml={3}
                sx={{ width: '98%' }}
            >
                <Grid item>
                    <Typography variant='h5'>To Do List</Typography>
                </Grid>
                <TodoFilter
                    toggle={toggle}
                    handleFiltersChange={handleFiltersChange}
                    filters={filters}
                />
                <Grid item sx={{ width: '100%' }}>
                    <List
                        itemCount={data.length}
                        itemSize={TODO_ITEM_SIZE}
                        height={500}
                    >
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
            </Grid>
            <Dialog
                open={open}
                onClose={toggle}
                PaperProps={{
                    sx: {
                        width: 600
                    },
                }}
            >
                <TodoForm
                    onClose={handleFormClose}
                    getTodos={getTodos}
                    id={editableTodoId}
                />
            </Dialog>
        </Container>
    );
}
