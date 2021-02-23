import React from 'react';
import Button from '@material-ui/core/Button';
import {useSnackbar} from 'notistack';
import {NotificationContext} from "../../store/notificationContext";


export default function NotificationPane() {
    const {enqueueSnackbar} = useSnackbar();
    const handleClickVariant = (data) => {
        enqueueSnackbar(data, {
            variant: 'warning',
            autoHideDuration: null,
            anchorOrigin: {vertical: "top", horizontal: "right"},
            action: (
                <Button color="primary" size="small" onClick={console.log(data)}>
                    View
                </Button>
            )
        });
    };

    return (
        <React.Fragment>
            <NotificationContext.Consumer>
                {(notifyService) => {
                    notifyService.connect()
                    notifyService.registerOnClose(console.log)
                    notifyService.registerNotificationReceived(handleClickVariant)
                }}
            </NotificationContext.Consumer>
        </React.Fragment>
    )

}
