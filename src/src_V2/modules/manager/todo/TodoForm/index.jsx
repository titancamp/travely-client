import {
    Button,
    DialogActions,
    DialogTitle, Divider, FormControl, Grid,
    IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField
} from "@mui/material";
import {CalendarToday, Close, NotificationsActive, Search} from "@mui/icons-material";
import { useFormik } from "formik";
import {getTodoFormValidation, TaskStatus} from "../utils";
import React from "react";
import TodoClient from "../../../../../api/todo-client";

const TodoForm = ({ onClose }) => {
    const {
        values,
        touched,
        errors,
        handleSubmit,
        isValid,
        handleChange,
    } = useFormik({
        initialValues: {
            title: '',
            deadline: '',
            description: '',
            tourId: '',
            reminder: '',
            status: 'todo',
            priority: 'medium',
        },
        onSubmit: async (values) => {
            await TodoClient.addTodo(values);
        },
        validationSchema: getTodoFormValidation(),
    });

    return <form onSubmit={handleSubmit}>
        <DialogTitle>
            Add To Do Item
            <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <Close />
            </IconButton>
        </DialogTitle>
        <Divider />
        <Grid container sx={{ py: 2, px: 3, }} spacing={2}>
            <Grid item xs={12}>
                <TextField
                    placeholder='Title *'
                    size='small'
                    fullWidth
                    name='name'
                    value={values.name}
                    error={touched.name && errors.name}
                    onChange={handleChange}
                    helperText={errors.name}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    placeholder='Deadline *'
                    size='small'
                    fullWidth
                    name='deadline'
                    value={values.deadline}
                    error={touched.deadline && errors.deadline}
                    onChange={handleChange}
                    helperText={errors.deadline}
                    type='datetime-local'
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    placeholder='Description'
                    multiline
                    rows={3}
                    fullWidth
                    name='description'
                    value={values.description}
                    error={touched.description && errors.description}
                    onChange={handleChange}
                    helperText={errors.description}
                />
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel size='small'>Attached to tour</InputLabel>
                    <Select
                        size='small'
                        label='Attached to tour'
                        name='tourId'
                        value={values.tourId}
                        error={touched.tourId && errors.tourId}
                        onChange={handleChange}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel size='small'>Reminder</InputLabel>
                    <Select
                        size='small'
                        IconComponent={() => <NotificationsActive sx={{
                            color: 'action.active',
                            position: 'absolute',
                            right: 7,
                        }}/>}
                        label='Reminder'
                        name='reminder'
                        value={values.reminder}
                        error={touched.reminder && errors.reminder}
                        onChange={handleChange}
                    >
                        <MenuItem value='5m'>5m before deadline</MenuItem>
                        <MenuItem value='1h'>1h before deadline</MenuItem>
                        <MenuItem value='2h'>2h before deadline</MenuItem>
                        <MenuItem value='1d'>1d before deadline</MenuItem>
                        <MenuItem value='custom'>Custom reminder</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel size='small'>Status</InputLabel>
                    <Select
                        size='small'
                        label='Status'
                        name='status'
                        value={values.status}
                        error={touched.status && errors.status}
                        onChange={handleChange}
                    >
                        <MenuItem value={TaskStatus.TODO}>To Do</MenuItem>
                        <MenuItem value={TaskStatus.IN_PROGRESS}>In Progress</MenuItem>
                        <MenuItem value={TaskStatus.DONE}>Done</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel size='small'>Priority</InputLabel>
                    <Select
                        size='small'
                        label='Priority'
                        name='priority'
                        value={values.priority}
                        error={touched.priority && errors.priority}
                        onChange={handleChange}
                    >
                        <MenuItem value='high'>High</MenuItem>
                        <MenuItem value='medium'>Medium</MenuItem>
                        <MenuItem value='low'>Low</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
        <DialogActions>
            <Button sx={{ color: 'text.primary' }} onClick={onClose}>Cancel</Button>
            <Button
                variant='contained'
                disabled={!isValid}
                type='submit'
            >Save</Button>
        </DialogActions>
    </form>
};

export default TodoForm;
