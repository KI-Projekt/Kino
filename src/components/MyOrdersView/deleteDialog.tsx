import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery, useTheme } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import React from "react";

interface ShowDetailsEditTileProps {
    dialogOpen: boolean,
    setDialogOpen: Function
    onRefundClick: Function
}

function DeleteDialog(props: ShowDetailsEditTileProps) {

    const theme = useTheme();

    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <>
                        <Dialog
                            fullScreen={fullScreen}
                            open={props.dialogOpen}
                            onClose={() => props.setDialogOpen(false)}
                            aria-labelledby="responsive-dialog-title"
                        >
                            <DialogTitle id="responsive-dialog-title">
                                Deleting Show
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Are you sure you want Refund your Order?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => props.onRefundClick()} autoFocus startIcon={<DeleteForeverIcon />}>
                                    Refund
                                </Button>
                                <Button autoFocus onClick={() => props.setDialogOpen(false)} variant="contained">
                                    Cancel
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </>
    );
}


export default DeleteDialog;