import { Alert, AlertColor, Snackbar } from "@mui/material";

function SnackbarBox({ show, message, severity }: { show: boolean, message: string, severity: AlertColor | undefined }) {

    return <Snackbar
        key={'snackbox'}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={show}>
        <Alert severity={severity} sx={{ width: '100%' }}>
            {message}
        </Alert>
    </Snackbar>
}

export default SnackbarBox;