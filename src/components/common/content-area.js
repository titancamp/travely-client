import React, { useContext, useCallback } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { DRAWER_WIDTH } from "../../utility";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import { NotificationContext } from "../../store/notificationContext";

const CustomButton = withStyles({
  root: {
    textTransform: "none",
  },
})(Button);

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
  const history = useHistory();

  const handleLogout = useCallback(() => {
    localStorage.removeItem("AuthContext");
    localStorage.removeItem("agencyId");
    history.push("");
  }, []);

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
                <CustomButton color="inherit" onClick={handleLogout}>
                  Log out
                </CustomButton>
              </Toolbar>
            </AppBar>
            <br />
            <br />
            <Container maxWidth="xl">
              <Component />
            </Container>
          </Route>
        ))}
      </Switch>
    </div>
  );
};
