import React from "react";
import { NavLink } from "react-router-dom";

import Box from "@material-ui/core/Box";
import AirplanemodeActiveIcon from "@material-ui/icons/AirplanemodeActive";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";

import { DRAWER_WIDTH } from "../../utility";
import {RecentTours} from "../user/tour/recent-tours";

export const Sidebar = ({ pages }) => {
  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      classes={{
        paper: classes.drawer,
      }}
    >
      <div style={{height: "50%"}}>
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
        </List>
      </div>

      <div style={{height: "50%"}}>
        <Divider />
        <Box
            className={classes.toolbar}
            px={2}
            display="flex"
            alignItems="end"
        >
          <AccessTimeIcon className={classes.logo} />
          <Typography variant="h5"> Recent Tours</Typography>
        </Box>
        <Divider />

      <RecentTours/>
      </div>
    </Drawer>
  );
};

// styles
const useStyles = makeStyles((theme) => ({
  logo: {
    fontSize: "32px",
    transform: "rotate(45deg)",
    display: "inline-block",
    "-webkit-transform": "rotate(45deg)",
    "-moz-transform": "rotate(45deg)",
    "-ms-transform": "rotate(45deg)",
    "-o-transform": "rotate(45deg)",
  },
  toolbar: theme.mixins.toolbar,
  drawer: {
    width: DRAWER_WIDTH,
  },
  activeNavLink: {
    backgroundColor: theme.palette.action.selected,
  },
}));
