import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import CardHeader from '@material-ui/core/CardHeader';
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import Container from '@material-ui/core/Container';
import HomeIcon from '@material-ui/icons/Home';
import WorkIcon from '@material-ui/icons/Work';
import PersonIcon from '@material-ui/icons/Person';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Home from './home/home';
import Tour from './tour/tour';

export default function User() {
    const [activeSelected, setSelected] = useState(0);
    const classes = useStyles();

    const pages = [
        {
            title: 'Home',
            path: '/user/home',
            icon: <HomeIcon />,
            component: Home
        },
        {
            title: 'Tour',
            path: '/user/tour',
            icon: <WorkIcon />,
            component: Tour
        }
    ];

    return (
        <Router>
            <React.Fragment>
                <CssBaseline />
                <Grid container spacing={0}>
                    <Grid item xs={1}>
                        <Drawer
                            variant="permanent"
                            anchor="left"
                        >
                            <CardHeader
                                style={{ padding: '13px' }}
                                avatar={
                                    <AirplanemodeActiveIcon className={classes.logo} />
                                }
                                title={
                                    <Typography variant='h5'>Travelly</Typography>
                                }
                            />
                            <Divider />
                            <List>
                                {
                                    pages.map(({ title, path }, index) => (
                                        <ListItem
                                            button
                                            key={title}
                                            onClick={() => setSelected(index)}
                                            selected={activeSelected === index ? true : false}
                                        >
                                            <Link to={path}>
                                                {title}
                                            </Link>
                                        </ListItem>
                                    ))
                                }
                            </List>
                        </Drawer>
                    </Grid>
                    <Grid item xs={11}>
                        <AppBar position="relative">
                            <Toolbar>
                                <Grid container>
                                    <Grid item xs={9}>
                                        <CardHeader
                                            avatar={pages[activeSelected].icon}
                                            title={
                                                <Typography variant='h6'>{pages[activeSelected].title}</Typography>
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <div>
                                            <Button
                                                style={{ color: 'white', top: '13px' }}
                                                startIcon={<AddBoxIcon />}
                                            >
                                                Create new tour
                                                </Button>
                                            <Button
                                                style={{ color: 'white', top: '13px' }}
                                                startIcon={<PersonIcon />}
                                            >
                                                My profile
                                            </Button>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Toolbar>
                        </AppBar>
                    </Grid>
                    <Container maxWidth='lg' disableGutters style={{ paddingTop: '30px' }}>
                        <Switch>
                            {
                                pages.map(({ path, component: Component }, index) => (
                                    <Route path={path} key={index}>
                                        <Component />
                                    </Route>
                                ))}
                        </Switch>
                    </Container>
                </Grid>
            </React.Fragment>
        </Router>
    );
}

// styles
const useStyles = makeStyles(() => ({
    logo: {
        fontSize: '32px',
        transform: 'rotate(45deg)',
        display: 'inline-block',
        '-webkit-transform': 'rotate(45deg)',
        '-moz-transform': 'rotate(45deg)',
        '-ms-transform': 'rotate(45deg)',
        '-o-transform': 'rotate(45deg)'
    }
}));