import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import { DRAWER_WIDTH } from "../../utility";

const notifications = [
    {
      message: "notification message 1",
      date: Date.now()
    },
    {
        message: "notification message 2",
        date: Date.now()
    },
  ];

export const NotificationArea = ()=>{

 const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      anchor="right"
      classes={{
        paper: classes.drawer,
      }}
    >
      <Box
        className={classes.toolbar}
        px={2}
        display="flex"
        alignItems="center"
      >
        <NotificationsIcon className={classes.logo} />
        <Typography variant="h5">Notifications</Typography>
      </Box>
      <Divider />
      <ul>
        {notifications.map(({ message, date }, index) => (
          <li>{message} <br/> {date}</li>
        ))}
      </ul>
    </Drawer>
  );
};

// styles
const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  drawer: {
    width: DRAWER_WIDTH,
  },
}));