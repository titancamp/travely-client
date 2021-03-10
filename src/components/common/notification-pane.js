import React from 'react';
import Button from '@material-ui/core/Button';
import {useSnackbar} from 'notistack';
import {NotificationContext} from "../../store/notificationContext";


export default function NotificationPane() {
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    //Todo use notification id
    let key = 1;
    const handleReceiveMessage = (data) => {
        enqueueSnackbar(data.message, {
            variant: 'success',
            autoHideDuration: null,
            anchorOrigin: {vertical: "top", horizontal: "right"},
            key,
            action: (
                <Button color="primary" size="small" onClick={() => handleButtonClick(data, key)}>
                    View
                </Button>
            )
        });
        key++;
    };

    const handleButtonClick = (data, key) => {
        //todo navigation specified module
        console.log(data);
        closeSnackbar(key);
    }
    return (
        <React.Fragment>
            <NotificationContext.Consumer>
                {(notifyService) => {
                    notifyService.connect()
                    notifyService.registerOnClose(console.log)
                    notifyService.registerNotificationReceived(handleReceiveMessage)
                }}
            </NotificationContext.Consumer>
        </React.Fragment>
    )

}
