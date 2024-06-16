import { TableCell, tableCellClasses, TableRow, Container, Typography, TableContainer, Paper, Table, TableHead, TableBody, styled, TextField, Button } from '@mui/material';
import * as React from 'react';
import { AdminProps, OpeningHourDay } from '../interfaces/Interfaces';
import { redTheme } from '../interfaces/Theme';
import { changeOpeningHour } from '../queries/changeOpeningHours';
import { fetchAllOpeningHours } from '../queries/fetchOpeninHours';
import UpdateIcon from '@mui/icons-material/Update';
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

function OpeningHoursView(prop: AdminProps) {

    const [openingHoursFetch, setOpeningHoursFetch] = React.useState<Array<OpeningHourDay>>([]);

    const [alertOpen, setAlertOpen] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [alertText, setAlertText] = React.useState("");

    const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, openingHourDay: OpeningHourDay) => {
        const newDay = {
            ...openingHourDay,
            [e.target.id]: e.target.value
        };

        let newOpeningHours = [...openingHoursFetch];
        newOpeningHours[openingHourDay.id - 1] = newDay;

        setOpeningHoursFetch(newOpeningHours);
    }

    const save = (openingHourDay: OpeningHourDay) => {
        changeOpeningHour(openingHourDay).then((result) => {
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
                setAlertOpen(true);
                setAlertText(`New Opening Hours on ${openingHourDay.weekday} added successfully`);
                fetchAllOpeningHours().then((result) => {
                    setOpeningHoursFetch(result);
                })
            }
        });
    }

    React.useEffect(() => {
        fetchAllOpeningHours().then((result) => {
            setOpeningHoursFetch(result);
        })
    }, [])

    return (
        <Container maxWidth={prop.isAdmin ? "sm" : "xs"} sx={{ pb: 3 }}>
            <Typography
                variant='h4'
                align='left'
                sx={{ paddingBottom: '3rem', paddingTop: '3rem', color: redTheme.palette.primary.contrastText }}
            >
                Opening hours
            </Typography>
            <TableContainer component={Paper} sx={{ backgroundColor: redTheme.palette.common.white }} >
                <Table aria-label="customized table">
                    <TableHead >
                        <TableRow >
                            <StyledTableCell >Weekday</StyledTableCell>
                            {!prop.isAdmin && (
                                <StyledTableCell align="right">Opening hours</StyledTableCell>
                            )}
                            {prop.isAdmin && (
                                <>
                                    <StyledTableCell align="left">Start</StyledTableCell>
                                    <StyledTableCell align="left">End</StyledTableCell>
                                    <StyledTableCell align="left" />
                                </>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {openingHoursFetch.map((row: OpeningHourDay) => (
                            <StyledTableRow key={row.weekday}>
                                <StyledTableCell component="th" scope="row">
                                    {row.weekday}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    {!prop.isAdmin && (
                                        <Typography>
                                            {row.openingtime.split(":")[0] + ":" + row.openingtime.split(":")[1] + " - "}
                                            {row.closingtime.split(":")[0] + ":" + row.closingtime.split(":")[1]}
                                        </Typography>
                                    )}
                                    {prop.isAdmin && (
                                        <>
                                            <TextField variant='outlined'
                                                value={row.openingtime}
                                                id='openingtime'
                                                onChange={(e) => handleOnChange(e, row)}
                                                label={`Opening Time`} />
                                        </>
                                    )}
                                </StyledTableCell>
                                {prop.isAdmin && (
                                    <>
                                        <StyledTableCell align="right">
                                            <TextField variant='outlined'
                                                value={row.closingtime}
                                                id='closingtime' onChange={(e) => handleOnChange(e, row)}
                                                label={`Closing Time`} />
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            <Button id={row.id.toString()} startIcon={<UpdateIcon />} onClick={() => save(row)}>Update</Button>
                                        </StyledTableCell>
                                    </>
                                )}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Alerts alertOpen={alertOpen} alertText={alertText} isError={isError} setAlertOpen={setAlertOpen} />
        </Container>
    )
}

export default OpeningHoursView;