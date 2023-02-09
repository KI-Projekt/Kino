import { styled, useTheme } from '@mui/material/styles';
import { TableCell, tableCellClasses, TableRow, TableContainer, Paper, Table, TableHead, TableBody, Container, Typography, TextField, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, useMediaQuery } from '@mui/material';
import * as React from 'react';
import { AdminProps, fareInput, fareSelection } from '../interfaces/Interfaces';
import { redTheme } from '../interfaces/Theme';
import UpdateIcon from '@mui/icons-material/Update';
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { fetchAllFares } from '../queries/fetchFares';
import { changeFare, deleteFare, postNewFare } from '../queries/changeFares';
import Alerts from '../components/Alerts';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function TicketPricesView(adminProp: AdminProps) {

    const [newFare, setNewFare] = React.useState<fareInput>({ name: "", fareCondition: "", price: 0 });
    const [fareToDelete, setFareToDelete] = React.useState<fareSelection>({ id: -1, name: "", fareCondition: "", price: 0, amountOfTickets: -1 });
    const [allFares, setAllFares] = React.useState<Array<fareSelection> | undefined>(undefined);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [alertText, setAlertText] = React.useState("");

    const theme = useTheme();

    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    React.useEffect(() => {
        fetchAllFares().then(fares => setAllFares(fares));
    }, []);

    const changeNewFare = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const fare = {
            ...newFare,
            [e.target.id]: e.target.value
        };
        setNewFare(fare);
    }

    const saveNewFare = () => {
        postNewFare(newFare).then((result) => {
            if (result.error) {
                setAlertText(result.error);
                setIsError(true);
                setAlertOpen(true);
            } else if (result.errorMessage) {
                setAlertText(result.errorMessage);
                setIsError(true);
                setAlertOpen(true);
            } else {
                setIsError(false);
                fetchAllFares().then(fares => setAllFares(fares));
                setAlertText("Fare added successfully");
                setAlertOpen(true);
            }
        });
        setNewFare({ name: "", fareCondition: "", price: 0 });
    }

    const changeExistingFare = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, fare: fareSelection) => {
        if (allFares) {
            const changedFare = {
                ...fare,
                [e.target.id]: e.target.value
            };

            let fares = [...allFares];
            fares[changedFare.id - 1] = changedFare;
            setAllFares(fares)
        }
    }

    const safeFareChanges = (fare: fareSelection) => {
        changeFare(fare).then((result) => {
            if (result.error) {
                setAlertText(result.error);
                setIsError(true);
                setAlertOpen(true)
            } else if (result.errorMessage) {
                setAlertText(result.errorMessage);
                setIsError(true);
                setAlertOpen(true)
            } else {
                setIsError(false);
                setAlertText("Fare changed successfully");
                setAlertOpen(true)
            }
        });
    }

    const handleDeleteFare = () => {
        deleteFare(fareToDelete.id).then(result => {
            if (result.error) {
                setAlertText(result.error);
                setIsError(true);
                setAlertOpen(true)
            } else if (result.errorMessage) {
                setAlertText(result.errorMessage);
                setIsError(true);
                setAlertOpen(true)
            } else {
                setIsError(false);
                fetchAllFares().then(fares => setAllFares(fares));
                setAlertText("Fare deleted successfully");
                setAlertOpen(true)
            }
        })
        setDialogOpen(false);
    }


    return (
        <Container maxWidth='md' sx={{ pb: 3 }}>
            <Typography variant='h4' align='left' sx={{ paddingBottom: '3rem', paddingTop: '3rem', color: redTheme.palette.primary.contrastText }}>Ticket Prices</Typography>
            <TableContainer component={Paper} sx={{ backgroundColor: redTheme.palette.common.white }} >
                <Table aria-label="customized table">
                    <TableHead >
                        <TableRow >
                            <StyledTableCell >Ticket Category</StyledTableCell>
                            {!adminProp.isAdmin && (
                                <StyledTableCell align="right" >Price</StyledTableCell>
                            )}
                            {adminProp.isAdmin && (
                                <StyledTableCell align="right" >Price in €</StyledTableCell>
                            )}

                            <StyledTableCell align="right">Condition</StyledTableCell>
                            {adminProp.isAdmin && (
                                <StyledTableCell align="right" >Action</StyledTableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allFares && allFares.map((row) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                    {!adminProp.isAdmin && (
                                        <Typography>{row.name}</Typography>
                                    )}
                                    {adminProp.isAdmin && (
                                        <TextField variant='outlined' id='name' value={row.name} label={`Category`} onChange={(e) => changeExistingFare(e, row)} />
                                    )}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    {!adminProp.isAdmin && (
                                        <Typography>{row.price} €</Typography>
                                    )}
                                    {adminProp.isAdmin && (
                                        <TextField variant='outlined' id='price' type="number" value={row.price} label={`Price for ${row.name}`} onChange={(e) => changeExistingFare(e, row)} />
                                    )}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    {!adminProp.isAdmin && (
                                        <Typography>{row.fareCondition}</Typography>
                                    )}
                                    {adminProp.isAdmin && (
                                        <TextField variant='outlined' id='fareCondition' value={row.fareCondition} label={`Condition for ${row.name}`} onChange={(e) => changeExistingFare(e, row)} />
                                    )}

                                </StyledTableCell>
                                {adminProp.isAdmin && (
                                    <StyledTableCell align="right">
                                        <>
                                            <Button id={row.id.toString()} startIcon={<UpdateIcon />} onClick={() => safeFareChanges(row)}>Update</Button>
                                            <Button id={row.id.toString()} startIcon={<DeleteForeverIcon />} onClick={() => { setDialogOpen(true); setFareToDelete(row) }}>Delete</Button>
                                        </>

                                    </StyledTableCell>
                                )}
                            </StyledTableRow>
                        ))}
                        {adminProp.isAdmin && (
                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    <TextField variant='outlined' label="Insert Category" id='name' value={newFare.name} onChange={changeNewFare} />
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <TextField variant='outlined' label="Insert Price" id='price' value={newFare.price} type="number" onChange={changeNewFare} />

                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <TextField variant='outlined' label="Insert Condition" id='fareCondition' value={newFare.fareCondition} onChange={changeNewFare} />
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <Button startIcon={<SaveIcon />} onClick={saveNewFare}>Save</Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog
                fullScreen={fullScreen}
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    Deleting Fare
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this Fare from our Database?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteFare} autoFocus startIcon={<DeleteForeverIcon />}>
                        Delete
                    </Button>
                    <Button autoFocus onClick={() => setDialogOpen(false)} variant="contained">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            <Alerts alertOpen={alertOpen} alertText={alertText} isError={isError} setAlertOpen={setAlertOpen} />
        </Container>
    );
}

export default TicketPricesView;