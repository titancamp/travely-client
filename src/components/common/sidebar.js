import React, { useCallback } from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

import Box from "@material-ui/core/Box";
import AirplanemodeActiveIcon from "@material-ui/icons/AirplanemodeActive";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";

import { DRAWER_WIDTH } from "../../utility";

export const Sidebar = ({ pages }) => {
  const classes = useStyles();
  const history = useHistory();

  const handleLogout = useCallback(() => {
    localStorage.removeItem("AuthContext");
    localStorage.removeItem("agencyId");
    history.push("");
  }, []);

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      classes={{
        paper: classes.drawer,
      }}
    >
      <div>
        <Box
          className={classes.toolbar}
          px={2}
          display="flex"
          alignItems="center"
        >
          <AirplanemodeActiveIcon className={classes.logo} />
          <Typography variant="h5">Travelly</Typography>
        </Box>
        <Divider />
        <List>
          {pages.map(({ title, path, icon }, index) => (
            <ListItem
              button
              key={index}
              component={NavLink}
              to={path}
              activeClassName={classes.activeNavLink}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText>{title}</ListItemText>
            </ListItem>
          ))}
          <Box mt={2}>
            <Button onClick={handleLogout}>Logout</Button>
          </Box>
        </List>
      </div>
    </Drawer>
  );
};

// styles
const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  drawer: {
    width: DRAWER_WIDTH,
  },
  activeNavLink: {
    backgroundColor: theme.palette.action.selected,
  },
}));
