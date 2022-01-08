import {
    useCallback,
    useState
} from 'react';
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Collapse,
    Grid,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Tooltip,
    Typography
} from '@mui/material';
import {
    AddAlert,
    Alarm,
    Delete,
    Edit,
    LocationOn,
    MoreVert,
    NotificationsActive,
    SettingsBackupRestore
} from '@mui/icons-material';
import {
    useAnchor,
    useToggle
} from '../../../../hooks';
import {
    ReminderStatus,
    TaskStatus
} from '../utils';
import useStyles from './styles';
import TaskPriorityMenu from '../task-priority-menu';
import { useSelector } from 'react-redux';
import { getTodoItemSelector } from '../../../../store/selectors/todo.selectors';
import TaskStatusMenu from '../task-status-menu';
import TodoClient from '../../../../../api/todo-client';

const mapToReminderState = (notificationTime) => ({
    [ReminderStatus.NOT_SET]: {
        icon: <AddAlert sx={{ opacity: 0.25 }} />,
        tooltipText: 'No reminder',
    },
    [ReminderStatus.SET]: {
        icon: <NotificationsActive color='warning' />,
        tooltipText: notificationTime,
    },
    [ReminderStatus.PASSED]: {
        icon: <NotificationsActive color='warning' sx={{ opacity: 0.5 }} />,
        tooltipText: 'Sent',
    }
});

const TodoItem = ({
    tourLocation,
    id,
    getTodos,
    handleEdit,
}) => {
    const todo = useSelector(getTodoItemSelector(id));

    const { open: expanded, toggle } = useToggle();

    const [drawCollapseText, setDrawCollapseText] = useState(false);

    const styles = useStyles(todo.status === TaskStatus.ARCHIVED);

    const {
        handleClick: handleMoreVertClick,
        anchorEl: moreVertEl,
        open: actionsOpen,
        handleClose: handleMoreVertClose,
    } = useAnchor();

    const descriptionRef = useCallback(node => {
        if (node !== null) {
            setDrawCollapseText(node.scrollHeight > node.clientHeight);
        }
    }, []);

    const handleTaskDelete = async () => {
        await TodoClient.deleteTodo(todo.id);
        getTodos();
    };

    const duplicateTask = async () => {
        await TodoClient.duplicateTodo(todo);
        getTodos();
    };

    const restoreTask = async () => {
        await TodoClient.updateTodo({
            ...todo,
            status: TaskStatus.TODO,
        });
        getTodos();
    };

    return (<Card sx={styles.card}>
        <Grid container>
            <Grid item xs={4}>
                <CardHeader
                    title={todo.name}
                    titleTypographyProps={{
                        variant: 'subtitle1',
                        pb: 1,
                    }}
                    subheader={<Grid container spacing={2}>
                        <Grid item sx={styles.iconWithInfo}>
                            <Alarm sx={styles.icon}/>
                            <Typography variant='caption'>
                                {todo.reminder}
                            </Typography>
                        </Grid>
                        <Grid item sx={styles.iconWithInfo}>
                            <LocationOn sx={styles.icon} />
                            <Typography variant='caption'>
                                {tourLocation}
                            </Typography>
                        </Grid>
                    </Grid>}
                />
            </Grid>
            <Grid item xs={todo.status === TaskStatus.ARCHIVED ? 8 : 5} sx={styles.contentContainer}>
                <CardContent sx={styles.content}>
                    {!expanded && (<>
                        <Typography
                            variant='subtitle2'
                            sx={styles.description}
                            ref={descriptionRef}
                        >
                            {todo.description}
                        </Typography>
                        {drawCollapseText && (
                            <Typography color='primary' variant='subtitle2' onClick={toggle}>Read all</Typography>
                        )}
                    </>)}
                    <Collapse in={expanded}>
                        <Typography variant='subtitle2'>
                            {todo.description}
                        </Typography>
                        {drawCollapseText && (
                            <Typography color='primary' variant='subtitle2' onClick={toggle}>Show less</Typography>
                        )}
                    </Collapse>
                </CardContent>
                {todo.status === TaskStatus.ARCHIVED && (<IconButton sx={{ alignSelf: 'center' }} onClick={restoreTask}>
                    <SettingsBackupRestore />
                </IconButton>)}
            </Grid>
            {todo.status !== TaskStatus.ARCHIVED && (
                <Grid item xs={3}>
                    <CardActions sx={styles.actions}>
                        <TaskPriorityMenu todo={todo} />
                        <Tooltip title={mapToReminderState(todo.reminder)[todo.reminderStatus].tooltipText}>
                            <IconButton>
                                {mapToReminderState(todo.reminder)[todo.reminderStatus].icon}
                            </IconButton>
                        </Tooltip>
                        <TaskStatusMenu todo={todo} getTodos={getTodos} />
                        <IconButton  onClick={handleMoreVertClick}>
                            <MoreVert />
                        </IconButton>
                        <Menu
                            anchorEl={moreVertEl}
                            open={actionsOpen}
                            onClose={handleMoreVertClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                        >
                            <MenuItem onClick={() => handleEdit(id)}>
                                <ListItemIcon>
                                    <Edit />
                                </ListItemIcon>
                                <ListItemText>Edit</ListItemText>
                            </MenuItem>
                            <MenuItem onClick={duplicateTask}>
                                <ListItemIcon>
                                    <Edit />
                                </ListItemIcon>
                                <ListItemText>Duplicate</ListItemText>
                            </MenuItem>
                            <MenuItem onClick={handleTaskDelete}>
                                <ListItemIcon>
                                    <Delete />
                                </ListItemIcon>
                                <ListItemText>Delete</ListItemText>
                            </MenuItem>
                        </Menu>
                    </CardActions>
                </Grid>
            )}
        </Grid>
    </Card>);
};

export default TodoItem;
