import {
    Button,
    Divider,
    FormControl,
    Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    Tab,
    Tabs,
    TextField
} from '@mui/material';
import {
    TaskPriority,
    TaskStatus
} from '../utils';
import {
    Add,
    Search
} from '@mui/icons-material';
import { useEffect } from 'react';
import { useFormik } from 'formik';
import useStyles from './styles';

const TodoFilter = ({ toggle, handleFiltersChange, filters }) => {
    const {
        values,
        touched,
        errors,
        handleSubmit,
        handleChange,
    } = useFormik({
        initialValues: {
            name: filters.name,
            statuses: filters.statuses ? filters.statuses.split(',') : [],
            priorities: filters.priorities ? filters.priorities.split(',') : [],
        },
    });

    const styles = useStyles();

    useEffect(() => {
        handleFiltersChange({
            name: values.name,
            statuses: values.statuses.join(','),
            priorities: values.priorities.join(','),
        });
    }, [values.name, values.statuses.length, values.priorities.length]);

    const handleTabChange = (e, tab) => {
        handleFiltersChange({ tab });
    };

    return (<>
        <Grid item>
            <Tabs value={filters.tab} onChange={handleTabChange}>
                <Tab label='To Do List' value={TaskStatus.TODO} />
                <Tab label='Archived' value={TaskStatus.ARCHIVED} />
            </Tabs>
            <Divider />
        </Grid>
        <Grid item>
            <form onSubmit={handleSubmit}>
                <Grid
                    container
                    direction='row'
                    spacing={3}
                >
                    <Grid item xs={2}>
                        <TextField
                            InputProps={{
                                startAdornment: <InputAdornment position='start'>
                                    <Search />
                                </InputAdornment>
                            }}
                            name='name'
                            fullWidth
                            value={values.name}
                            errors={touched.name && errors.name}
                            onChange={handleChange}
                            placeholder='Search'
                            size='small'
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl fullWidth>
                            <InputLabel
                                size='small'
                            >Status</InputLabel>
                            <Select
                                label='Status'
                                value={values.statuses}
                                errors={touched.statuses && errors.statuses}
                                onChange={handleChange}
                                multiple
                                name='statuses'
                                size='small'
                            >
                                <MenuItem value={TaskStatus.TODO}>To Do</MenuItem>
                                <MenuItem value={TaskStatus.IN_PROGRESS}>In Progress</MenuItem>
                                <MenuItem value={TaskStatus.DONE}>Done</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl fullWidth>
                            <InputLabel
                                size='small'
                            >Priority</InputLabel>
                            <Select
                                label='Priority'
                                value={values.priorities}
                                errors={touched.priorities && errors.priorities}
                                onChange={handleChange}
                                multiple
                                name='priorities'
                                size='small'
                            >
                                <MenuItem value={TaskPriority.LOW}>Low</MenuItem>
                                <MenuItem value={TaskPriority.MEDIUM}>Medium</MenuItem>
                                <MenuItem value={TaskPriority.HIGH}>High</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} sx={styles.add}>
                        <Button
                            variant='contained'
                            startIcon={<Add sx={styles.addIcon} />}
                            onClick={toggle}
                        >
                            Add New
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Grid>
    </>);
};

export default TodoFilter;
