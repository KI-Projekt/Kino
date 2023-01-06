import { Alert, Snackbar } from '@mui/material';
import * as React from 'react';

interface AlertProps {
    alertText: string,
    isError: boolean,
    alertOpen: boolean,
    setAlertOpen: Function,
}

function Alerts(props: AlertProps) {

    const handleAlertClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        props.setAlertOpen(false);
    };

    return (
        <Snackbar open={props.alertOpen} sx={{ width: "70%" }} autoHideDuration={4000} onClose={handleAlertClose} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
            {!props.isError ?
                <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
                    {props.alertText}
                </Alert>
                :
                <Alert onClose={handleAlertClose} severity="error" sx={{ width: '100%' }}>
                    {props.alertText}
                </Alert>}
        </Snackbar>
    );
}

export default Alerts;