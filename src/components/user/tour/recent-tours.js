import React from "react";

import { RECENT_TOURS } from "./utils/constants";
import { NavLink } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import { DRAWER_WIDTH } from "../../../utility";
import Typography from "@material-ui/core/Typography";

export const RecentTours = () => {
  const classes = useStyles();

  return (
    <List>
      {RECENT_TOURS.map(({ id, title, path }, index) => (
        <ListItem
          button
          key={index}
          component={NavLink}
          to={`${path}/${id}`}
          activeClassName={classes.activeNavLink}
        >
          <ListItemText
            primary={
              <Typography
                style={{ color: "#077baa", textDecoration: "underline" }}
              >
                {" "}
                {title}{" "}
              </Typography>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

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
