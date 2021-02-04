import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import CardHeader from '@material-ui/core/CardHeader';
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import Container from '@material-ui/core/Container';
import ApartmentIcon from '@material-ui/icons/Apartment';
import GroupIcon from '@material-ui/icons/Group';
import HotelIcon from '@material-ui/icons/Hotel';
import LockIcon from '@material-ui/icons/Lock';
import PublicIcon from '@material-ui/icons/Public';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AgencyProfile from './agency/agency-profile';
import ManageStaff from './staff/manage-staff';
import ManageHotels from './hotels/manage-hotels';
import ManageActivities from './activities/manage-activities';
import ChangePassword from './account/change-password';
import { getActionName } from '../../utility';

export default function Admin() {
    const [activeSelected, setSelected] = useState(0);
    const classes = useStyles();

    const pages = [
        {
            title: 'Agency Profile',
            path: '/admin/agencyProfile',
            icon: <ApartmentIcon />,
            component: AgencyProfile
        },
        {
            title: 'Manage Staff',
            path: '/admin/manageStaff',
            icon: <GroupIcon />,
            component: ManageStaff
        },
        {
            title: 'Manage Hotels',
            path: '/admin/manageHotels',
            icon: <HotelIcon />,
            component: ManageHotels
        },
        {
            title: 'Manage Activities',
            path: '/admin/manageActivities',
            icon: <PublicIcon />,
            component: ManageActivities
        },
        {
            title: 'Change Password',
            path: '/admin/changePassword',
            icon: <LockIcon />,
            component: ChangePassword
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
                                    <Grid item xs={10}>
                                        <CardHeader
                                            avatar={pages[activeSelected].icon}
                                            title={
                                                <Typography variant='h6'>{pages[activeSelected].title}</Typography>
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        {
                                            (pages[activeSelected].title !== "Change Password"
                                                && pages[activeSelected].title !== "Agency Profile") ?
                                                <div>
                                                    <Button
                                                        style={{ color: 'white', top: '13px' }}
                                                        startIcon={<AddCircleIcon />}
                                                    >
                                                        {getActionName(pages[activeSelected].title)}
                                                    </Button>
                                                </div> : ""
                                        }
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