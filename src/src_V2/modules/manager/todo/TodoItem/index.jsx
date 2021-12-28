import React, {useState} from "react";
import {
    Box, Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Collapse,
    Grid,
    IconButton, List, ListItem, Menu, MenuItem,
    Tooltip,
    Typography
} from "@mui/material";
import {
    AddAlert,
    Alarm,
    KeyboardArrowDown,
    LocationOn,
    NotificationsActive
} from "@mui/icons-material";
import {useAnchor, useToggle} from "../../../../hooks";
import {TaskPriority, TaskStatus} from "../utils";

const mapToPriority = {
  [TaskPriority.LOW]: {
      color: 'warning.main',
      tooltipText: 'Low priority'
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

const mapToReminderState = (notificationTime) => ({
    NOT_SET: {
        icon: <NotificationsActive color='warning' sx={{ opacity: 0.5 }} />,
        tooltipText: 'No reminder',
    },
    SET: {
        icon: <NotificationsActive color='warning' />,
        tooltipText: notificationTime,
    },
    SENT: {
        icon: <AddAlert sx={{ opacity: 0.25 }} />,
        tooltipText: '',
    }
});

const mapToStatus = {
    [TaskStatus.TODO]: {
        color: 'primary',
        title: 'To-do'
    },
    [TaskStatus.IN_PROGRESS]: {
        color: 'warning',
        title: 'In Progress',
    },
    [TaskStatus.DONE]: {
        color: 'success',
        title: 'Done',
    }
}

const TodoItem = ({
      title,
      reminderTime,
      tourLocation,
      description,
      priority,
      reminderState,
      status,
}) => {
    const { open: expanded, toggle } = useToggle();

    const {
        handleClick,
        anchorEl,
        open,
        handleClose,
    } = useAnchor();

   const { color, tooltipText } = mapToPriority[priority];

   const applyActiveStyles = (taskStatus) => {
       if (taskStatus === status) {
           return ({
               backgroundColor: 'primary.main',
               color: 'common.white',
           })
       }
       return {};
   }

   return (<Card>
       <Grid container>
           <Grid item xs={4}>
               <CardHeader
                   title={title}
                   titleTypographyProps={{
                       variant: 'subtitle1',
                       pb: 1,
                   }}
                   subheader={<Grid container spacing={2}>
                       <Grid item sx={{ display: 'flex', alignItems: 'center', }}>
                           <Alarm sx={{ width: 16, height: 16, mr: 1, }}/>
                           <Typography variant='caption'>
                               {reminderTime}
                           </Typography>
                       </Grid>
                       <Grid item sx={{ display: 'flex', alignItems: 'center', }}>
                           <LocationOn sx={{ width: 16, height: 16, mr: 1, }} />
                           <Typography variant='caption'>
                               {tourLocation}
                           </Typography>
                       </Grid>
                   </Grid>}
               />
           </Grid>
           <Grid item xs={5} sx={{ display: 'flex', alignItems: 'center' }}>
               <CardContent sx={theme => ({
                   pt: 0,
                   '&:last-child': {
                       paddingBottom: 0,
                   },
                   borderLeft: `1px solid ${theme.palette.divider}`,
                   borderRight: `1px solid ${theme.palette.divider}`,
                   mt: 1,
               })}>
                   {!expanded && (<>
                       <Typography variant='subtitle2' sx={{
                           display: '-webkit-box',
                           WebkitLineClamp: '3',
                           WebkitBoxOrient: 'vertical',
                           overflow: 'hidden',
                           textOverflow: 'ellipsis',
                       }}>
                           {description}
                       </Typography>
                       <Typography color='primary' variant='subtitle2' onClick={toggle}>Read all</Typography>
                   </>)}
                   <Collapse in={expanded}>
                       <Typography variant='subtitle2'>
                           {description}
                       </Typography>
                       <Typography color='primary' variant='subtitle2' onClick={toggle}>Show less</Typography>
                   </Collapse>
               </CardContent>
           </Grid>
           <Grid item xs={3}>
               <CardActions>
                   <Tooltip title={tooltipText}>
                       <IconButton>
                           <Box sx={{ width: 16, height: 16, backgroundColor: color, borderRadius: '50%' }} />
                       </IconButton>
                   </Tooltip>
                   <Tooltip title={mapToReminderState('5 minutes age')[reminderState].tooltipText}>
                       <IconButton>
                           {mapToReminderState('5 minutes age')[reminderState].icon}
                       </IconButton>
                   </Tooltip>
                   <Button
                       variant='outlined'
                       sx={{
                           borderRadius: 20,
                           textTransform: 'none',
                       }}
                       endIcon={<KeyboardArrowDown />}
                       color={mapToStatus[status].color}
                       onClick={handleClick}
                   >
                       {mapToStatus[status].title}
                   </Button>
                   <Menu
                       anchorEl={anchorEl}
                       open={open}
                       onClose={handleClose}
                       PaperProps={{
                           sx: {
                               mt: 1,
                               width: 250,
                           }
                       }}
                       MenuListProps={{
                           sx: {
                               py: 0,
                           }
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
                    <MenuItem sx={{ py: 2, ...applyActiveStyles(TaskStatus.TODO) }}>To-Do</MenuItem>
                    <MenuItem sx={{ py: 2, ...applyActiveStyles(TaskStatus.IN_PROGRESS) }}>In Progress</MenuItem>
                    <MenuItem sx={{ py: 2, ...applyActiveStyles(TaskStatus.DONE) }}>Done</MenuItem>
                    <MenuItem sx={{ py: 2, ...applyActiveStyles(TaskStatus.ARCHIVED) }}>Archive</MenuItem>
                   </Menu>
               </CardActions>
           </Grid>
       </Grid>
   </Card>);
};

export default TodoItem;
