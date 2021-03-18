import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { DRAWER_WIDTH } from "../../utility";
import { Badge, IconButton } from "@material-ui/core";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import { NotificationContext } from "../../store/notificationContext";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  appBarShift: {
    width: `calc(100% - ${DRAWER_WIDTH})`,
    marginRight: DRAWER_WIDTH,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  contentArea: {
    width: `calc(100% - ${DRAWER_WIDTH})`,
    marginLeft: DRAWER_WIDTH,
  },
}));

export const ContentArea = ({
  pages,
  toggleNotificationPane,
  openNotificationPane,
}) => {
  const classes = useStyles();
  const notificationService = useContext(NotificationContext);
  return (
    <div className={classes.contentArea}>
      <Switch>
        {pages.map(({ path, component: Component, icon, title }, index) => (
          <Route path={path} key={index}>
            <AppBar
              position="static"
              className={openNotificationPane ? classes.appBarShift : ""}
            >
              <Toolbar>
                <Box mr={1}>{icon}</Box>
                <Typography variant="h6" className={classes.title}>
                  {title}
                </Typography>
                <IconButton color="inherit" onClick={toggleNotificationPane}>
                  <Badge
                    color="secondary"
                    badgeContent={notificationService.notifications.length}
                  >
                    <NotificationsNoneIcon />
                  </Badge>
                </IconButton>
              </Toolbar>
            </AppBar>
            <Container>
              <Component />
            </Container>
          </Route>
        ))}
      </Switch>
    </div>
  );
};
