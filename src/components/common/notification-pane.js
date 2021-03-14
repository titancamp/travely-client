import React, {useContext} from 'react';
import Button from '@material-ui/core/Button';
import {NotificationContext} from "../../store/notificationContext";
import {Card, Drawer} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {DRAWER_WIDTH} from "../../utility";


const useStyles = makeStyles(() => ({
    drawer: {
        width: DRAWER_WIDTH,
        flexShrink: 0,
    },
    drawerPaper: {
        width: DRAWER_WIDTH,
    },
    notification: {
        background: '#2e7d32',
        margin: '10px',
        padding: '5px',
    },
    notificationContent: {
        marginLeft: '5px',
        display: 'flex',
        flexDirection: 'column'
    },
    viewButton: {
        marginLeft: 'auto'
    }
}));


export default function NotificationPane({open}) {
    const classes = useStyles();
    const notificationService = useContext(NotificationContext)
    const handleButtonClick = (notification) => {
        console.log(notification);
    }

    const Notification = (notification) => {
        return (
            <Card elevation={3} className={classes.notification}
                  key={`${notification.resourceId}-${notification.module}`}>
                <div className={classes.notificationContent}>
                    <p>{notification.message}</p>
                    <Button className={classes.viewButton}
                            key={`${notification.resourceId} - ${notification.module}`}
                            onClick={() => handleButtonClick(notification)}
                            color='inherit'>
                        View
                    </Button>
                </div>
            </Card>
        )
    }
    // notificationService.connect();

    return (
        <React.Fragment>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="right"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}>
                {notificationService.notifications.map(notification => Notification(notification))}
            </Drawer>
        </React.Fragment>
    )
}
