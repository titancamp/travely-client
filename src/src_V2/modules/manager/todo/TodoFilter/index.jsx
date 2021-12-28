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
} from "@mui/material";
import {TaskPriority, TaskStatus} from "../utils";
import {Add, Search} from "@mui/icons-material";
import React, {useState} from "react";
import {useFormik} from "formik";

const TodoFilter = ({ toggle }) => {
    const [activeTab, setActiveTab] = useState('todo');

    const {
        values,
        touched,
        errors,
        handleSubmit,
        handleChange,
    } = useFormik({
        initialValues: {
            title: '',
            statuses: [],
            priorities: [],
        },
        onSubmit: (values) => {
            console.log(values);
        },
    });

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (<>
        <Grid item>
            <Tabs value={activeTab} onChange={handleTabChange}>
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
                            name='title'
                            fullWidth
                            value={values.title}
                            errors={touched.title && errors.title}
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
                                <MenuItem value={TaskStatus.ARCHIVED}>Archived</MenuItem>
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
                    <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant='contained'
                            startIcon={<Add sx={{ width: 24, height: 24 }} />}
                            onClick={toggle}
                        >
                            Add New
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Grid>
    </>);
}

export default TodoFilter;
