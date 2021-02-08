import React from "react";
import { Route, Switch } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { DRAWER_WIDTH } from "../../utility";

export const ContentArea = ({ pages }) => {
  const classes = useStyles();

  return (
    <div className={classes.contentArea}>
      <Switch>
        {pages.map(({ path, component: Component, icon, title }, index) => (
          <Route path={path} key={index}>
            <AppBar position="static">
              <Toolbar>
                <Box mr={1}>{icon}</Box>
                <Typography variant="h6">{title}</Typography>
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

// styles
const useStyles = makeStyles(() => ({
  contentArea: {
    width: `calc(100% - ${DRAWER_WIDTH})`,
    marginLeft: DRAWER_WIDTH,
  },
}));
